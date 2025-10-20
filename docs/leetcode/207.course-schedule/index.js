/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    if (!Array.isArray(prerequisites)) return false;
    const inDegree = new Array(numCourses).fill(0);
    const adjList = new Map();

    for (let [course, prereq] of prerequisites) {
        inDegree[course]++;
        if (!adjList.has(prereq)) {
            adjList.set(prereq, []);
        }
        adjList.get(prereq).push(course);
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let count = 0;
    while (queue.length > 0) {
        const current = queue.shift();
        count++;
        if (adjList.has(current)) {
            for (let neighbor of adjList.get(current)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return count === numCourses;
};

// 该结果该返回 true 但是 返回了 false
console.log(canFinish(3, [[1, 0], [2, 1]]));

module.exports = canFinish;
