import { AdditionNode, HydraNotation, Node, NumberNode } from "./notation";
import { deal } from "./utils";

export function isSuccessor(node: Node): boolean {

  if (node.nodeType == 'hydra')
    return false

  if (node.nodeType == 'n')
    return (node as NumberNode).value >= 1

  if (node.nodeType == 'add') {
    var nAdd = node as AdditionNode

    if (nAdd.nodes.length == 0) return false

    return isSuccessor(nAdd.nodes[-1])
  }

  return false
}

export function toOrigin(node: Node): Node | boolean {

  if (!isSuccessor(node))
    return false

  if (node.nodeType == 'hydra')
    return false

  if (node.nodeType == 'n') {
    var nn = node as NumberNode
    nn.value -= 1
    if (nn.value < 1)
      return true
  }

  if (node.nodeType == 'add') {
    var nAdd = node as AdditionNode

    if (nAdd.nodes.length == 0)
      return true

    deal(toOrigin(nAdd.nodes[-1]), () => nAdd.nodes.pop(), (n: Node) => nAdd.nodes[-1] = n)

    if (nAdd.nodes.length == 0)
      return true

    if (nAdd.nodes.length == 1)
      return nAdd.nodes[-1]
  }

  return false
}

export function isSuccessorNotation(notation: HydraNotation): boolean {
  if (notation.root == undefined)
    return false

  return isSuccessor(notation.root)
}

export function toOriginNotation(notation: HydraNotation): void {
  if (notation.root == undefined)
    return

  deal(toOrigin(notation.root), () => notation.root = undefined, (n: Node) => notation.root = n)
}
