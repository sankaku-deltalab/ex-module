import {ExStructDef} from '@dark-elixir/ex-module';
import {SayProtocol} from './say';

const moduleName = 'ExModuleExample.ProtocolExample.SwampMan';

export type SwampMan = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    name: string;
  }
>;

export namespace SwampMan {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<SwampMan>(SwampMan);

  export function create(name: string): SwampMan {
    return __meta__.gen({name});
  }
}
ExStructDef.verify<SwampMan>(SwampMan);

// defimpl ------
export class ImplSayForSwampMan implements SayProtocol<SwampMan> {
  greet<S extends SwampMan>(v: S, target: string): S {
    console.log(`Hello ${target}. Im ${v.name}.`);
    return {...v, name: target};
  }
}
