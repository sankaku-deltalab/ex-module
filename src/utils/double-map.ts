export class DoubleMap<K1, K2, V> {
  private readonly map1 = new Map<K1, Map<K2, V>>();

  set(k1: K1, k2: K2, v: V): void {
    let map2 = this.map1.get(k1);
    if (map2 === undefined) {
      map2 = new Map<K2, V>();
      this.map1.set(k1, map2);
    }
    map2.set(k2, v);
  }

  get(k1: K1, k2: K2): V | undefined {
    const map2 = this.map1.get(k1);
    if (map2 === undefined) {
      return undefined;
    }
    return map2.get(k2);
  }

  has(k1: K1, k2: K2): boolean {
    const map2 = this.map1.get(k1);
    if (map2 === undefined) {
      return false;
    }
    return map2.has(k2);
  }

  delete(k1: K1, k2: K2): boolean {
    const map2 = this.map1.get(k1);
    if (map2 === undefined) {
      return false;
    }
    return map2.delete(k2);
  }

  deleteAll(k1: K1): boolean {
    return this.map1.delete(k1);
  }
}
