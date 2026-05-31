import { AdditionNode, HydraNode, HydraNotation, Node } from "./notation";
import _ from "lodash";

export function expand(
    node: Node,
    badRoot: Node,
    canExpand: (n: Node) => boolean,
    m: number,
): Node | boolean {
    if (node.nodeType == "n") return false;

    if (node.nodeType == "add") {
        var na = node as AdditionNode;

        if (na.nodes.length == 0) return true;

        var res = expand(na.nodes[-1], badRoot, canExpand, m);

        if (typeof res == "boolean") {
            if (res) na.nodes.pop();
        } else {
            na.nodes[-1] = res;
        }

        if (na.nodes.length == 0) return true;

        if (na.nodes.length == 1) return na.nodes[0];
    }

    if (node.nodeType == "hydra") {
        var nh = node as HydraNode;

        if (nh.nodes.length == 0) return true;

        var index = nh.nodes.length - 1;

        while (index >= 0) if (nh.nodes[index] == undefined) index--;

        if (index == -1) return false;

        if (!canExpand(nh)) {
            var res = expand(nh.nodes[index] as Node, badRoot, canExpand, m);

            if (typeof res == "boolean") {
                if (res) nh.nodes[index] = undefined;
            } else {
                nh.nodes[index] = res;
            }

            return false;
        }

        if (m < 1) return true;

        nh.nodes[index] = _.cloneDeep(badRoot);
        var res = expand(nh.nodes[index] as Node, badRoot, canExpand, m - 1);

        if (typeof res == "boolean") {
            if (res) nh.nodes[index] = undefined;
        } else {
            nh.nodes[index] = res;
        }
    }

    return false;
}

export function expandNotation(
    notation: HydraNotation,
    badRoot: (n: HydraNotation) => Node,
    canExpand: (n: Node) => boolean,
    m: number): void {

    if (notation.root == undefined)
        return

    var res = expand(notation.root, badRoot(notation), canExpand, m)
    if (typeof res == 'boolean') {
        if (res)
            notation.root = undefined
    } else {
        notation.root = res
    }
}
