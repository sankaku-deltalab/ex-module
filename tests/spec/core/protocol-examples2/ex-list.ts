import {ExProtocol} from '../../../../src/core/protocol';
import {ExStruct} from '../../../../src/core/struct';
import {ExEnumerable, ExEnumerableProtocol} from './ex-enumerable';

export type ExList<T> = ExStruct.DefStruct<
  typeof ExList.__exModule__,
  {list: T[]}
> &
  ExEnumerable<T>;

export namespace ExList {
  export const __exModule__ = 'MyApp.Modules.ExList';
  export const __meta__ = ExStruct.genMeta<ExList<unknown>>(ExList);

  export function create<T>(list: T[]): ExList<T> {
    return __meta__.gen({list});
  }
}

export class ImplExEnumerableForExList<T>
  extends ExProtocol.ProtocolBase<ExList<T>>
  implements ExEnumerableProtocol<T>
{
  toArray(_args1: unknown, _args2: unknown): T[] {
    return this.value.list;
  }
}

ExProtocol.registerProtocolImpl(
  ExEnumerable.key,
  ExList.__exModule__,
  ImplExEnumerableForExList
);
