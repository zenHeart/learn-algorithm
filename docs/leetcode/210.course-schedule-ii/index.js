/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    if (!Array.isArray(prerequisites)) return [];
    const inDegree = new Array(numCourses).fill(0);
    const graph = new Map();

    for (let [course, prereq] of prerequisites) {
        if (!graph.has(prereq)) {
            graph.set(prereq, []);
        }
        graph.get(prereq).push(course);
        inDegree[course]++;
    }

    const queue = [];
    const learnCoursePath = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const current = queue.shift();
        learnCoursePath.push(current);
        if (graph.has(current)) {
            for (let neighbor of graph.get(current)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return learnCoursePath.length === numCourses ? learnCoursePath : [];
};

export default findOrder;
