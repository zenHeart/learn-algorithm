
class Graph {
    nodes
    edges
    constructor() {
        this.nodes = []
        this.edges = []
    }
    addNode(value) {
        const node = {
            value,
            neighbors: [],
        }
        this.nodes.push(node)
        return node
    }
    addEdge(option) {
        if (option.from === undefined || option.to === undefined) {
            console.dir(option, { depth: null })
            throw new Error('from and to are required')
        }
        const edge = {
            from: option.from,
            to: option.to,
            weight: option.weight || 1,
        }
        this.edges.push(edge)
        if (option.from && option.to) {
            option.from.neighbors.push(option.to)
            option.to.neighbors.push(option.from)
        }
    }
    getNode(value) {
        return this.nodes.find(node => node.value === value)
    }

    getNodes() {
        return this.nodes
    }
    getEdges(node) {
        return this.edges.filter(edge => edge.from === node)
    }

    getNeighbors(node) {
        return node.neighbors
    }
}
exports.createGraph = function createGraph(nodeNum, edges) {
    const graph = new Graph()
    const nodes = new Array(nodeNum).fill(0).map((_, index) => graph.addNode(index))
    edges.forEach(edge => {
        graph.addEdge({ from: nodes[edge[0]], to: nodes[edge[1]], weight: edge[2] })
    })
    return graph
}
