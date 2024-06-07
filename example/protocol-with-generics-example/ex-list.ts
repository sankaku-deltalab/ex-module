import {ExStructDef} from '@dark-elixir/ex-module';
import {ExEnumerableProtocol} from './ex-enumerable';

const moduleName = 'ExModuleExample.ProtocolWithGenericsExample.ExList';

export type ExList<Item> = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    items: Item[];
  }
>;

export namespace ExList {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<ExList<unknown>>(ExList);

  export function create<Item>(items: Item[]): ExList<Item> {
    return __meta__.gen({items});
  }
}
ExStructDef.verify<ExList<unknown>>(ExList);

// defimpl ------
export class ImplEnumerableForExList
  implements ExEnumerableProtocol<typeof moduleName>
{
  toArray<I extends unknown, U extends ExList<I>>(v: U): I[] {
    return v.items;
  }
}
