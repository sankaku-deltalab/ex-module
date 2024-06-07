import {ExStructDef} from '@dark-elixir/ex-module';
import {ExEnumerableProtocol} from './ex-enumerable';

const moduleName = 'ExModuleExample.ProtocolWithGenericsExample.ExMap';

export type ExMap<K extends string, V> = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    items: Record<K, V>;
  }
>;

export type MaybeExMap1<Item> = Item extends [infer K extends string, infer V]
  ? ExMap<K, V>
  : never;

export namespace ExMap {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<ExMap<string, unknown>>(ExMap);

  export function create<K extends string, V>(items: [K, V][]): ExMap<K, V> {
    const obj = {} as Record<K, V>;
    for (const [k, v] of items) {
      obj[k] = v;
    }
    return __meta__.gen({items: obj});
  }
}
ExStructDef.verify<ExMap<string, unknown>>(ExMap);

// defimpl ------
export class ImplEnumerableForExList
  implements ExEnumerableProtocol<typeof moduleName, [string, unknown]>
{
  toArray<I extends [string, unknown]>(v: MaybeExMap1<I>): I[] {
    return Object.entries(v.items) as I[];
  }
}
