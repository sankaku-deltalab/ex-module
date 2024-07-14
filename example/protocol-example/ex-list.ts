import {ExProtocol, ExStruct} from '@dark-elixir/ex-module';
import {ExEnumerable, ExEnumerableProtocol} from './ex-enumerable';

export type ExList<T> = ExStruct.DefStruct<
  typeof ExList.__exModule__,
  {list: T[]}
> &
  ExEnumerable<T>;

export namespace ExList {
  export const __exModule__ = 'ExModule.Example.ExList';
  export const __meta__ = ExStruct.genMeta<ExList<unknown>>(ExList);

  export function create<T>(list: T[]): ExList<T> {
    return __meta__.gen({list});
  }
}

export class ImplExEnumerableForExList<T>
  extends ExProtocol.ProtocolBase<ExList<T>>
  implements ExEnumerableProtocol<T>
{
  map<U>(fn: (value: T) => U): U[] {
    return this.value.list.map(fn);
  }
}
ExProtocol.registerProtocolImpl(
  ExEnumerable,
  ExList,
  ImplExEnumerableForExList
);
