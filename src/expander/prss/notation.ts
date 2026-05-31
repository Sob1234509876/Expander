import { expand, stripZero } from "./expand";

export type Prss = {
  numbers: number[];
  expand: (n: number) => Prss;
  toString: () => string;
  strip1zero: () => boolean;
};

export function seq(ns: number[]): Prss {
  return {
    numbers: ns,
    expand: (n: number) => seq(expand(ns, n)),
    toString: () => {
      if (ns.length == 0) return "";

      var cn = ns[0];
      var cnt = 0;
      var sb = "";

      for (const n of ns) {
        if (n != cn) {
          sb = sb.concat(`${cn}^${cnt},`);
          cnt = 0;
          cn = n;
        }

        cnt++;
      }

      sb = sb.concat(`${cn}^${cnt}`);

      return sb;
    },
    strip1zero: () => stripZero(ns),
  };
}
