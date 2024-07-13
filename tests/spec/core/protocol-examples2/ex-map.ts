import {ExProtocol} from '../../../../src/core/protocol';
import {ExStruct} from '../../../../src/core/struct';
import {ExEnumerable, ExEnumerableProtocol} from './ex-enumerable';

export type ExMap<K extends string, V> = ExStruct.DefStruct<
  typeof ExMap.__exModule__,
  {map: Record<K, V>}
> &
  ExEnumerable<[K, V]>;

export namespace ExMap {
  export const __exModule__ = 'MyApp.Modules.ExMap';
  export const __meta__ = ExStruct.genMeta<ExMap<string, unknown>>(ExMap);

  export function create<K extends string, V>(map: Record<K, V>): ExMap<K, V> {
    return __meta__.gen({map});
  }
}

export class ImplExEnumerableForExMap<K extends string, V>
  extends ExProtocol.ProtocolBase<ExMap<K, V>>
  implements ExEnumerableProtocol<[K, V]>
{
  toArray(_args1: unknown, _args2: unknown): [K, V][] {
    return Object.entries(this.value.map) as [K, V][];
  }
}

ExProtocol.registerProtocolImpl(ExEnumerable, ExMap, ImplExEnumerableForExMap);
