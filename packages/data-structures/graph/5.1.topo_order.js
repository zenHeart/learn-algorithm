const { createGraph } = require('./1.createGraph')

function topoOrder(graph) {
    const visited = new Set()
    const nodes = graph.nodes
    let curLabel = nodes.length
    const nodeOrderValue = new Map()
    function topo(g, v) {
        visited.add(v)
        const vEdges = g.getEdges(v);
        for (let i = 0; i < vEdges.length; i++) {
            const { from, to } = vEdges[i];
            if (!visited.has(to)) {
                topo(g, to)
            }
        }
        nodeOrderValue.set(v, curLabel)
        curLabel--
    }


    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if (!visited.has(node)) {
            topo(graph, node)
        }
    }
    return Array.from(nodeOrderValue.entries()).reduce((acc, [key, value]) => {
        acc[key.value] = value;
        return acc;
    }, {})
}

const graph = createGraph(4, [[0, 1, 1], [0, 2, 4], [1, 2, 2], [1, 3, 6], [2, 3, 3]])
console.dir(topoOrder(graph), { depth: null })