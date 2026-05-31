import _ from "lodash";
import { AdditionNode, HydraNode, HydraNotation, n, Node } from "./notation";
import { hasNext } from "./iterate";
import { deal } from "./utils";

export function expand(node: Node, expanded: Node, needReplace: (node: Node) => boolean): Node | boolean {
    if (needReplace(node))
        return expanded

    if (node.nodeType == 'n')
        return false

    if (node.nodeType == 'add') {
        var nAdd = node as AdditionNode
        if (nAdd.nodes.length == 0)
            return true

        deal(expand(nAdd.nodes[-1], expanded, needReplace), () => nAdd.nodes.pop(), (n: Node) => nAdd.nodes[-1] = n)

        if (nAdd.nodes.length == 0)
            return true

        if (nAdd.nodes.length == 1)
            return nAdd.nodes[-1]
    }

    if (node.nodeType == 'hydra') {
        var nHydra = node as HydraNode
        var index = hasNext(nHydra)

        deal(expand(nHydra.nodes[index] as Node, expanded, needReplace), () => nHydra.nodes[index] = undefined, (n: Node) => nHydra.nodes[index] = n)

        return false
    }

    return false
}

export function expandNotation(notation: HydraNotation, expanded: Node, needReplace: (node: Node) => boolean): void {

    if (notation.root == undefined)
        return

    deal(expand(notation.root, expanded, needReplace), () => notation.root = undefined, (n: Node) => notation.root = n)
}
