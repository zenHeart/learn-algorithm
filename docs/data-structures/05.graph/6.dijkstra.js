const { createGraph } = require('./1.createGraph')

function dijkstra(graph, startNode) {
    const distances = new Map();
    const visited = new Set([startNode]);
    // initial all distance
    const nodes = graph.getNodes();
    for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];
        if (currentNode === startNode) {
            distances.set(currentNode, 0);
        } else {
            distances.set(currentNode, Infinity);
        }
    }

    // 遍历边查找最短路径
    const edges = graph.edges;
    let minLen = Infinity
    let nextNode = null
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const { from, to, weight } = edge;
        if (visited.has(from) && !visited.has(to)) {
            const currentLen = distances.get(from) + weight;
            if (currentLen < minLen) {
                minLen = currentLen;
                nextNode = to;
            }
        }
        if ((i === (edges.length - 1)) && nextNode) {
            visited.add(nextNode);
            distances.set(nextNode, minLen);
            i = 0;
            minLen = Infinity;
            nextNode = null;
        }
    }
    return Array.from(distances.entries()).reduce((acc, [key, value]) => {
        acc[key.value] = value;
        return acc;
    }, {});
}

const graph = createGraph(4, [[0, 1, 1], [0, 2, 4], [1, 2, 2], [1, 3, 6], [2, 3, 3]])
console.dir(dijkstra(graph, graph.getNode(0)), { depth: null })