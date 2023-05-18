import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from '../core/struct';
import {SayProtocol} from './say';

const modId = 'MyApp.OneOfExStruct';
type ModId = typeof modId;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OneOfExStruct {
  export const __exModule__ = modId;
  export const isInstance = ExStructDef.isInstance<T>(OneOfExStruct);
  export const gen = ExStructDef.gen<ModId, T>(OneOfExStruct);

  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return gen({name});
  }
}
verifyExModuleForStruct<ModId, OneOfExStruct.T>(OneOfExStruct);

// defimpl
export class ImplSayForOneOfExS implements SayProtocol<OneOfExStruct.T> {
  say(v: OneOfExStruct.T): string {
    return 'Im ' + v.name;
  }
}
