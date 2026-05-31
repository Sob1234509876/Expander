import { AdditionNode, HydraNode, HydraNotation, Node } from "../../util/hydra/strict/notation";

export type An20Notation = HydraNotation

export type An20Node = Node & {
    an20Type: 'add' | 'pi'
}

export type An20AdditionNode = An20Node & AdditionNode & {
    an20Type: 'add'
}

export type An20PiNode = An20Node & HydraNode & {
    an20Type: 'pi'
}
