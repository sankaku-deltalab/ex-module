import {ExStructDef} from '@dark-elixir/ex-module';
import {GreetableProtocol} from './greetable';

const moduleName = 'ExModuleExample.ProtocolExample.Gentleman';

export type Gentleman = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    greed: string;
  }
>;

export namespace Gentleman {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<Gentleman>(Gentleman);

  export function create(greed: string): Gentleman {
    return __meta__.gen({greed});
  }
}
ExStructDef.verify<Gentleman>(Gentleman);

// defimpl ------
export class ImplSayForGentleman implements GreetableProtocol<Gentleman> {
  greet(v: Gentleman, target: string): Gentleman {
    console.log(`${v.greed}, ${target}.`);
    return v;
  }
}
