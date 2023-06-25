import {ExProtocol} from '@dark-elixir/ex-module';
import {ExList} from './ex-list';
import {ExMap, MaybeExMap1} from './ex-map';

export namespace Enumerable {
  type Types<Item> = {
    [ExList.__exModule__]: ExList<Item>;
    [ExMap.__exModule__]: MaybeExMap1<Item>;
  };
  export type URIs = keyof Types<never> & string;
  export type T<I, URI extends URIs = URIs> = Types<I>[URI];

  const genMethod = ExProtocol.accumulate<EnumerableProtocol>({});

  export const toArray = genMethod('toArray');
}

type URIs = Enumerable.URIs;
export interface EnumerableProtocol<
  URI extends URIs = URIs,
  ItemBase = unknown
> {
  toArray<I extends ItemBase>(v: Enumerable.T<I, URI>): I[];
}
