import { AdditionNode, HydraNode, n, Node } from "./notation"

export type NodeIterator = {
    value: Node,
    index: number,
    next: () => Node,
    hasNext: () => number
}

export function iterator(node: Node): NodeIterator {
    var t: NodeIterator = {
        index: 0,
        value: node,
        hasNext: () => hasNext(t.value),
        next: () => (t.value = next(t.value))
    }
    return t
}

export function get(node: Node, index: number): Node {
    if (node.nodeType == 'n')
        throw new Error();

    if (node.nodeType == 'add')
        return (node as AdditionNode).nodes[index]

    if (node.nodeType == 'hydra') {
        var t = (node as HydraNode).nodes[index]
        if (t == undefined)
            throw new Error();

        return t
    }

    throw new Error();
}

export function hasNext(node: Node): number {
    if (node.nodeType == 'n')
        return -1

    if (node.nodeType == 'add') {
        var nAdd = node as AdditionNode
        return nAdd.nodes.length - 1
    }

    if (node.nodeType == 'hydra') {
        var nHydra = node as HydraNode
        for (var i = nHydra.nodes.length - 1; i >= 0; i--)
            if (nHydra.nodes[i] != undefined)
                break

        return i
    }

    return -1
}

export function next(node: Node): Node {
    return get(node, hasNext(node))
}
