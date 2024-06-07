import {ExProtocol} from '@dark-elixir/ex-module';
import {ExList} from './ex-list';
import {ExMap, MaybeExMap1} from './ex-map';

type Types<Item> = {
  [ExList.__exModule__]: ExList<Item>;
  [ExMap.__exModule__]: MaybeExMap1<Item>;
};
type URIs = keyof Types<never> & string;
export type ExEnumerable<I, URI extends URIs = URIs> = Types<I>[URI];

export namespace ExEnumerable {
  const genMethod = ExProtocol.accumulate<ExEnumerableProtocol>({
    [ExList.__exModule__]: ExList,
    [ExMap.__exModule__]: ExMap,
  });

  export const toArray = genMethod('toArray');
}

export interface ExEnumerableProtocol<
  URI extends URIs = URIs,
  ItemBase = unknown
> {
  toArray<I extends ItemBase>(v: ExEnumerable<I, URI>): I[];
}
