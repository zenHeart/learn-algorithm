const { createGraph } = require('./1.createGraph')

function findAllConnectNodesByNeighbors(graph, startNode) {
    const visited = new Set()
    const result = []
    const queue = [startNode]
    visited.add(startNode)
    while (queue.length > 0) {
        const current = queue.shift()
        result.push(current)
        for (let neighbor of graph.getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push(neighbor)
            }
        }
    }
    return result
}

function findAllConnectNodesByEdges(graph, startNode) {
    const visited = new Set([startNode])
    const result = [startNode]
    const edges = graph.edges
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        if (visited.has(edge.from) && !visited.has(edge.to)) {
            visited.add(edge.to)
            result.push(edge.to)
            i = 0;
        }
        if (visited.has(edge.to) && !visited.has(edge.from)) {
            visited.add(edge.from)
            result.push(edge.from)
            i = 0;
        }

    }
    return result
}


// test
const graph = createGraph(5, [[0, 1], [0, 4], [2, 2], [2, 3], [3, 4]])
console.log(findAllConnectNodesByNeighbors(graph, graph.getNode(1)))
console.log(findAllConnectNodesByEdges(graph, graph.getNode(1)))