const { createGraph } = require('./1.createGraph')

function dps(graph, startNode) {
    let visited = new Set()
    let stack = [startNode]
    while (stack.length > 0) {
        const current = stack.pop();
        if (!visited.has(current)) {
            visited.add(current)
            let neighbors = graph.getNeighbors(current)
            for (let i = 0; i < neighbors.length; i++) {
                stack.push(neighbors[i])
            }
        }
    }
    return visited
}

// test
const graph = createGraph(5, [[0, 1], [0, 4], [2, 3], [3, 4]])
console.log(dps(graph, graph.getNode(1)))