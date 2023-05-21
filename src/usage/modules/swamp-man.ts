import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from '../../core/struct';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.SwampMan';
type ModId = typeof modId;

export namespace SwampMan {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(SwampMan);
  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return __meta__.gen({name});
  }

  export class ImplSay implements SayProtocol<T> {
    greet<S extends T>(v: S, target: string): S {
      console.log(`Hello ${target}. Im ${v.name}.`);
      return {...v, name: target};
    }
  }
}
verifyExModuleForStruct<ModId, SwampMan.T>(SwampMan);
