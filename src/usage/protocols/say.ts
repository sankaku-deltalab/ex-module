import {ExProtocol} from '../../core/protocol';
import {ExStruct} from '../../core/struct';
import {SwampMan} from '../modules/swamp-man';
import {Gentleman} from '../modules/gentleman';

export interface SayProtocol<Base extends ExStruct> {
  greet<S extends Base>(v: S, target: string): S;
}

export namespace Say {
  export type T = SwampMan.T | Gentleman.T;

  const accumulate = ExProtocol.accumulate<SayProtocol<T>>({
    [SwampMan.__exModule__]: new SwampMan.ImplSay(),
    [Gentleman.__exModule__]: new Gentleman.ImplSay(),
  });

  export const say = accumulate('greet');
}
