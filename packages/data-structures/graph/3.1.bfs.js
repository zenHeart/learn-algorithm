const { createGraph } = require('./1.createGraph')

function bfs(graph, startNode) {
    let visited = new Set()
    let queue = [startNode]
    while (queue.length > 0) {
        const current = queue.shift()
        let neighbors = graph.getNeighbors(current)
        for (let i = 0; i < neighbors.length; i++) {
            if (!visited.has(neighbors[i])) {
                visited.add(neighbors[i])
                queue.push(neighbors[i])
            }
        }
    }
    return visited
}

// test
const graph = createGraph(5, [[0, 1], [0, 4], [2, 2], [2, 3], [3, 4]])
console.log(bfs(graph, graph.getNode(1)))