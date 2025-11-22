import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.argv[2];

if (!url) {
   console.error('Please provide a LeetCode URL');
   process.exit(1);
}

async function main() {
   try {
      console.log(`Fetching ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const html = await response.text();

      const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
      if (!match) {
         throw new Error('Could not find __NEXT_DATA__ in the page');
      }

      const data = JSON.parse(match[1]);
      const queries = data.props?.pageProps?.dehydratedState?.queries;

      if (!queries) {
         throw new Error('Could not find queries in __NEXT_DATA__');
      }

      // Find the query that contains the question data
      const questionQuery = queries.find(q => q.state?.data?.question?.questionId);
      if (!questionQuery) {
         throw new Error('Could not find question data in queries');
      }

      const questionData = questionQuery.state.data.question;

      const {
         questionFrontendId,
         titleSlug,
         translatedTitle,
         translatedContent,
         codeSnippets
      } = questionData;

      console.log(`Found question: ${questionFrontendId}. ${titleSlug}`);

      const targetDir = path.resolve(__dirname, `../docs/leetcode/${questionFrontendId}.${titleSlug}`);

      if (fs.existsSync(targetDir)) {
         console.log(`Directory ${targetDir} already exists. Skipping...`);
         return;
      }

      fs.mkdirSync(targetDir, { recursive: true });

      // Create README.md
      const readmeContent = `# [${translatedTitle}](${url})\n\n## 题目描述\n\n${translatedContent}\n\n## 解题思路\n\n<!-- TODO: Add solution explanation -->\n`;
      fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);

      // Create index.js
      // Try to find JavaScript snippet
      const jsSnippet = codeSnippets?.find(s => s.langSlug === 'javascript')?.code ||
         `/**
 * @param {number} x
 * @return {number}
 */
var solution = function(x) {
    
};`;

      let indexJsContent = jsSnippet + '\n\n';

      // Simple heuristic to add export default
      const funcNameMatch = jsSnippet.match(/var\s+(\w+)\s*=|function\s+(\w+)\s*\(/);
      if (funcNameMatch) {
         const funcName = funcNameMatch[1] || funcNameMatch[2];
         indexJsContent += `export default ${funcName};\n`;
      } else {
         indexJsContent += `export default solution;\n`;
      }

      fs.writeFileSync(path.join(targetDir, 'index.js'), indexJsContent);

      // Create index.test.js
      const testContent = `import { describe, it, expect } from 'vitest';
import solution from './index';

describe('${questionFrontendId}. ${translatedTitle}', () => {
  it('should pass sample tests', () => {
    // expect(solution(...)).toBe(...);
  });
});
`;
      fs.writeFileSync(path.join(targetDir, 'index.test.js'), testContent);

      console.log(`Successfully created ${targetDir}`);

   } catch (error) {
      console.error('Error:', error);
      process.exit(1);
   }
}

main();
