import {ExStructDef} from '../../core/struct';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.Gentleman';
type ModId = typeof modId;

export namespace Gentleman {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(Gentleman);
  export type T = ExStructDef.DefExStruct<ModId, {greed: string}>;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }
}
ExStructDef.verify<ModId, Gentleman.T>(Gentleman);

type T = Gentleman.T;
export class ImplSayForGentleman implements SayProtocol<T> {
  greet<S extends T>(v: S, _target: string): S {
    console.log(`${v.greed}, Sir.`);
    return v;
  }
}
