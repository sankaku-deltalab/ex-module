import {ExStructDef} from '../../../../src/core/struct';
import {SayProtocol} from './say';

export namespace SwampMan {
  export const __exModule__ = 'MyApp.Modules.SwampMan';
  export const __meta__ = ExStructDef.meta<T>(SwampMan);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      name: string;
    }
  >;

  export function create(name: string): T {
    return __meta__.gen({name});
  }
}
ExStructDef.verify<SwampMan.T>(SwampMan);

// defimpl ------
type T = SwampMan.T;
export class ImplSayForSwampMan implements SayProtocol<T> {
  greet<S extends T>(v: S, target: string): [string, S] {
    return [`Hello ${target}. Im ${v.name}.`, {...v, name: target}];
  }
}
