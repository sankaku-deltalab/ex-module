import {ExStructDef} from '@dark-elixir/ex-module';
import {GreetableProtocol} from './greetable';

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
export class ImplSayForSwampMan implements GreetableProtocol<SwampMan> {
  greet(v: SwampMan, target: string): SwampMan {
    console.log(`Hello ${target}. Im ${v.name}.`);
    return SwampMan.create(target);
  }
}
