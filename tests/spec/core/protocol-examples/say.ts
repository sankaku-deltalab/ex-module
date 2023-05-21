import {ExStruct} from '../../../../src/core/struct';
import {ExProtocol} from '../../../../src/core/protocol';
import {Gentleman, ImplSayForGentleman} from './gentleman';
import {ImplSayForSwampMan, SwampMan} from './swamp-man';

export interface SayProtocol<Base extends ExStruct> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet<S extends Base>(v: S, target: string): [string, S];
}

export namespace Say {
  export type T = SwampMan.T | Gentleman.T;

  const genMethod = ExProtocol.accumulate<SayProtocol<T>>({
    [SwampMan.__exModule__]: new ImplSayForSwampMan(),
    [Gentleman.__exModule__]: new ImplSayForGentleman(),
  });

  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  export const greet = genMethod('greet');
}
