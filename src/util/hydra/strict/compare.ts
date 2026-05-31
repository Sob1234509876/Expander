import { AdditionNode, HydraNode, Node, NumberNode } from "./notation";

export function compareNumber(a: number, b: number): number {
  return a == b ? 0 : a > b ? 1 : -1;
}

export function compareArray<T>(
  a: T[],
  b: T[],
  c: (a1: T, b1: T) => number,
): number {
  var lenCmp = compareNumber(a.length, b.length);
  var minLen = Math.min(a.length, b.length);

  for (var i = 0; i < minLen; i++) {
    var res = c(a[i], b[i]);
    if (res != 0) return res;
  }

  return lenCmp;
}

export function compare(a: Node | undefined, b: Node | undefined): number {
  if (a == undefined) return b == undefined ? 0 : -1;

  if (b == undefined) return 1;

  if (a.nodeType == "n") {
    if (b.nodeType == "n")
      return compareNumber((a as NumberNode).value, (b as NumberNode).value);

    return -compare(b, a);
  }

  if (a.nodeType == "add") {
    var aa = a as AdditionNode;

    if (b.nodeType == "add")
      return compareArray(aa.nodes, (b as AdditionNode).nodes, compare);

    if (aa.nodes.length == 0) return -1;

    if (aa.nodes.length == 1) return compare(aa.nodes[0], b);

    return compare(aa.nodes[0], b) >= 0 ? 1 : -1;
  }

  if (a.nodeType == "hydra") {
    var ah = a as HydraNode;

    if (b.nodeType == "hydra")
      return compareArray(ah.nodes, (b as HydraNode).nodes, compare);

    if (ah.nodes.length == 0) return -1;

    if (b.nodeType == "n") return 1;

    return -compare(b, a);
  }

  return -compare(b, a);
}
