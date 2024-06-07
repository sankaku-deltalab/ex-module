import {ExProtocol} from '@dark-elixir/ex-module';
import {ImplSayForSwampMan, SwampMan} from './swamp-man';
import {Gentleman, ImplSayForGentleman} from './gentleman';

export type Greetable = SwampMan | Gentleman;

export namespace Greetable {
  const genMethod = ExProtocol.accumulate<GreetableProtocol<Greetable>>({
    [SwampMan.__exModule__]: new ImplSayForSwampMan(),
    [Gentleman.__exModule__]: new ImplSayForGentleman(),
  });

  export const greet = genMethod('greet');
}

export interface GreetableProtocol<Base> {
  greet(v: Base, target: string): Base;
}
