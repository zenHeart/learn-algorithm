const { createGraph } = require('./1.createGraph')

const visited = new Set()
function dps_recursion(graph, startNode) {
    visited.add(startNode)
    const neighbors = graph.getNeighbors(startNode)
    for (let i = 0; i < neighbors.length; i++) {
        if (!visited.has(neighbors[i])) {
            dps_recursion(graph, neighbors[i])
        }
    }
    return visited
}


const graph = createGraph(5, [[0, 1], [0, 4], [2, 3], [3, 4]])
console.dir(dps_recursion(graph, graph.getNode(1)), { depth: null })