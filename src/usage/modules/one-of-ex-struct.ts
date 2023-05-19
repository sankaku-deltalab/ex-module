import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from '../../core/struct';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.OneOfExStruct';
type ModId = typeof modId;

export namespace OneOfExStruct {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(OneOfExStruct);
  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return __meta__.gen({name});
  }
}
verifyExModuleForStruct<ModId, OneOfExStruct.T>(OneOfExStruct);

// defimpl
export class ImplSayForOneOfExS implements SayProtocol<OneOfExStruct.T> {
  say(v: OneOfExStruct.T): string {
    return 'Im ' + v.name;
  }
}
