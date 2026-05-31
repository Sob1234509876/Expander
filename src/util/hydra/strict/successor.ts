import { AdditionNode, HydraNotation, Node, NumberNode } from "./notation";

export function isSuccessor(node: Node): boolean {
  if (node.nodeType == "n") return true;

  if (node.nodeType == "add") {
    var na = node as AdditionNode;
    if (na.nodes.length == 0) return false;
    return isSuccessor(na.nodes[-1]);
  }

  return false;
}

export function toOrigin(node: Node): boolean {
  if (node.nodeType == "n") {
    var nn = node as NumberNode;

    nn.value -= 1;

    return nn.value < 1;
  }

  if (node.nodeType == "add") {
    var na = node as AdditionNode;

    if (na.nodes.length == 0) return true;

    if (toOrigin(na.nodes[-1])) {
      na.nodes.pop();
      return na.nodes.length <= 0;
    }
  }

  return false;
}

export function isSuccessorNotation(notation: HydraNotation): boolean {
  if (notation.root == null) return false;

  return isSuccessor(notation.root);
}

export function toOriginNotation(notation: HydraNotation): void {
  if (notation.root == null) return;

  if (toOrigin(notation.root)) {
    if (notation.root.nodeType == "n") {
      notation.root = undefined;
      return;
    }

    if (notation.root.nodeType == "add") {
      var na = notation.root as AdditionNode;

      if (na.nodes.length == 0) notation.root = undefined;

      notation.root = na.nodes[0];

      return;
    }
  }
}
