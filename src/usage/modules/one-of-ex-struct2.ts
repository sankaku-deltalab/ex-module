import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from '../../core/struct';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.OneOfExStruct2';
type ModId = typeof modId;

export namespace OneOfExStruct2 {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(OneOfExStruct2);
  export type T = DefExStruct<ModId, {greed: string}>;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }
}
verifyExModuleForStruct<ModId, OneOfExStruct2.T>(OneOfExStruct2);

// defimpl
export class ImplSayForOneOfExS2 implements SayProtocol<OneOfExStruct2.T> {
  say(v: OneOfExStruct2.T): string {
    return v.greed + ' Sir.';
  }
}
