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
         codeSnippets,
         topicTags,
         jsonExampleTestcases,
         metaData: metaDataStr,
         content
      } = questionData;

      console.log(`Found question: ${questionFrontendId}. ${titleSlug}`);

      const targetDir = path.resolve(__dirname, `../docs/leetcode/${questionFrontendId}.${titleSlug}`);

      if (fs.existsSync(targetDir)) {
         console.log(`Directory ${targetDir} already exists. Skipping...`);
         // We might want to update files, but for now let's stick to skipping or maybe just warn
         // return; 
      } else {
         fs.mkdirSync(targetDir, { recursive: true });
      }

      // --- Generate README.md ---
      const tags = (topicTags || []).map(t => t.translatedName || t.name);
      const yamlFrontmatter = tags.length > 0
         ? `---\ntags:\n${tags.map(t => `  - ${t}`).join('\n')}\n---\n\n`
         : '';

      const readmeContent = `${yamlFrontmatter}# [${translatedTitle}](${url})\n\n## 题目描述\n\n${translatedContent}\n\n## 解题思路\n\n<!-- TODO: Add solution explanation -->\n`;
      fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);

      // --- Generate index.js ---
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
      const funcName = funcNameMatch ? (funcNameMatch[1] || funcNameMatch[2]) : 'solution';

      if (funcNameMatch) {
         indexJsContent += `export default ${funcName};\n`;
      } else {
         indexJsContent += `export default solution;\n`;
      }

      if (!fs.existsSync(path.join(targetDir, 'index.js'))) {
         fs.writeFileSync(path.join(targetDir, 'index.js'), indexJsContent);
      }

      // --- Generate index.test.js ---
      let testDataObj = {};
      try {
         const metaData = JSON.parse(metaDataStr);
         const inputs = JSON.parse(jsonExampleTestcases || '[]');

         // Try to extract expected outputs from content
         // Regex to find "Output:</strong> <value>" or "Output: <value>"
         // This is heuristic and might fail for complex outputs
         const outputMatches = [...content.matchAll(/Output:?<\/strong>\s*([^<]+)/g)];

         inputs.forEach((inputStr, index) => {
            // inputStr is like "-3\n0\n..."
            // We need to parse each line as a value
            const inputValues = inputStr.split('\n').map(val => {
               try {
                  return JSON.parse(val);
               } catch {
                  return val;
               }
            });

            let expectedValue = null;
            if (outputMatches[index]) {
               const outputStr = outputMatches[index][1].trim();
               try {
                  expectedValue = JSON.parse(outputStr);
               } catch {
                  expectedValue = outputStr;
               }
            }

            testDataObj[`示例 ${index + 1}`] = {
               input: inputValues,
               expect: expectedValue
            };
         });

      } catch (e) {
         console.warn('Error parsing test cases:', e);
         testDataObj = {
            '示例 1': {
               input: [],
               expect: null
            }
         };
      }

      // Format testData object to string, handling arrays and objects nicely
      const formatValue = (val) => JSON.stringify(val);

      let testDataCode = 'let testData = {\n';
      for (const [key, val] of Object.entries(testDataObj)) {
         testDataCode += `  "${key}": {\n`;
         testDataCode += `    input: ${formatValue(val.input)},\n`;
         testDataCode += `    expect: ${formatValue(val.expect)}\n`;
         testDataCode += `  },\n`;
      }
      testDataCode += '};\n';

      const testContent = `import { describe, it, expect } from 'vitest';
import ${funcName} from './index';

${testDataCode}

describe('${questionFrontendId}. ${translatedTitle}', () => {
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = ${funcName}(...data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
`;
      fs.writeFileSync(path.join(targetDir, 'index.test.js'), testContent);

      console.log(`Successfully processed ${targetDir}`);

   } catch (error) {
      console.error('Error:', error);
      process.exit(1);
   }
}

main();
