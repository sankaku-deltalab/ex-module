import {ExProtocol, ExStruct} from '@dark-elixir/ex-module';
import {ExEnumerable, ExEnumerableProtocol} from './ex-enumerable';

export type ExMap<K extends string, V> = ExStruct.DefStruct<
  typeof ExMap.__exModule__,
  {map: Record<K, V>}
> &
  ExEnumerable<[K, V]>;

export namespace ExMap {
  export const __exModule__ = 'ExModule.Example.ExMap';
  export const __meta__ = ExStruct.genMeta<ExMap<string, unknown>>(ExMap);

  export function create<K extends string, V>(map: Record<K, V>): ExMap<K, V> {
    return __meta__.gen({map});
  }
}

export class ImplExEnumerableForExMap<K extends string, V>
  extends ExProtocol.ProtocolBase<ExMap<K, V>>
  implements ExEnumerableProtocol<[K, V]>
{
  map<U>(fn: (value: [K, V]) => U): U[] {
    const items = Object.entries(this.value.map) as [K, V][];
    return items.map(fn);
  }
}
ExProtocol.registerProtocolImpl(ExEnumerable, ExMap, ImplExEnumerableForExMap);
