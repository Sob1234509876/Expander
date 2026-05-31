export type HydraNotation = {
  root?: Node;
  isSuccessor: () => boolean;
  expand: (n: number) => void;
  origin: () => void;
};

export type Node = {
  nodeType: string;
};

export type HydraNode = Node & {
  nodeType: "hydra";
  nodes: (Node | undefined)[];
};

export type AdditionNode = Node & {
  nodeType: "add";
  nodes: Node[];
};

export type NumberNode = Node & {
  nodeType: "n";
  value: number;
};
