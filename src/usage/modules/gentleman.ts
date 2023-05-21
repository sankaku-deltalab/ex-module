import {ExStructDef} from '../../core/struct';
import {SayProtocol} from '../protocols/say';

export namespace Gentleman {
  export const __exModule__ = 'MyApp.Modules.Gentleman';
  export const __meta__ = ExStructDef.meta<T>(Gentleman);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      greed: string;
    }
  >;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }
}
ExStructDef.verify<Gentleman.T>(Gentleman);

// defimpl ------
type T = Gentleman.T;
export class ImplSayForGentleman implements SayProtocol<T> {
  greet<S extends T>(v: S, target: string): S {
    console.log(`${v.greed}, Sir ${target}.`);
    return v;
  }
}
