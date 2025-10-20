/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
function newNode(val, neighbors) {
    return {
        val: val === undefined ? 0 : val,
        neighbors: neighbors === undefined ? [] : neighbors
    }
}

var cloneGraph = function (node) {
    const cloneNeighborsGraph = []
    function deepCloneNode(node) {
        if (!node) return

        const nodeIndex = node.val - 1
        if (cloneNeighborsGraph[nodeIndex]) {
            return cloneNeighborsGraph[nodeIndex]
        }
        const newCloneNode = newNode(node.val);
        cloneNeighborsGraph[nodeIndex] = newCloneNode;
        if (Array.isArray(node.neighbors)) {
            for (let i = 0; i < node.neighbors.length; i++) {
                const neighborNode = node.neighbors[i]
                const newCloneNeighborNode = deepCloneNode(neighborNode)
                newCloneNode.neighbors.push(newCloneNeighborNode)
            }
        }
        return newCloneNode
    }
    return deepCloneNode(node)
};

// let graph = [newNode(1), newNode(2), newNode(3), newNode(4)]
// graph[0].neighbors = [graph[1]]
// graph[1].neighbors = [graph[2]]
// graph[2].neighbors = [graph[3]]
// graph[3].neighbors = [graph[0]]

// console.dir(graph[0], { depth: null })

// console.dir(cloneGraph(graph[0]), { depth: null })


module.exports = cloneGraph;
