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
    // 创建入度表
    const inDegree = new Array(numCourses).fill(0);
    // 创建图
    const graph = new Map();

    // 生成图和入度表
    for (let [course, prereq] of prerequisites) {
        if (!graph.has(prereq)) {
            graph.set(prereq, []);
        }
        graph.get(prereq).push(course);
        inDegree[course]++;
    }

    // 创建队列
    const queue = [];
    const learnCoursePath = [];
    // 将入度为0的节点加入队列
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

module.exports = findOrder;
