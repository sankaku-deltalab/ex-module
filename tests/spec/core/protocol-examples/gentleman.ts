import {ExStructDef} from '../../../../src/core/struct';
import {SayProtocol} from './say';

export namespace Gentleman {
  export const __exModule__ = 'MyApp.Modules.Gentleman';
  export const __meta__ = ExStructDef.meta<T>(Gentleman);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      greet: string;
    }
  >;

  export function create(greet: string): T {
    return __meta__.gen({greet});
  }
}
ExStructDef.verify<Gentleman.T>(Gentleman);

// defimpl ------
type T = Gentleman.T;
export class ImplSayForGentleman implements SayProtocol<T> {
  greet<S extends T>(v: S, target: string): [string, S] {
    return [`${v.greet}, Sir ${target}.`, v];
  }
}
