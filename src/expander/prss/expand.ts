export function expand(ns: number[], n: number): number[] {
  var lastNum = ns[ns.length - 1];
  var index = ns.length - 2;

  while (index > -1) {
    if (ns[index] < lastNum) break;
    index--;
  }

  if (index < 0) return ns;

  var bad = ns.slice(index, ns.length - 1);
  var good = ns.slice(0, index);

  for (var i = 0; i < n; i++) {
    good = good.concat(bad);
  }

  return good;
}

export function stripZero(ns: number[]): boolean {
  if (ns.length == 0) return false;

  if (ns[ns.length - 1] == 0) {
    ns.pop();
    return true;
  }

  return false;
}
