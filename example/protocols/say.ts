import {ExProtocol} from '@dark-elixir/ex-module';
import {ImplSayForSwampMan, SwampMan} from '../modules/swamp-man';
import {Gentleman, ImplSayForGentleman} from '../modules/gentleman';

export interface SayProtocol<Base> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet<S extends Base>(v: S, target: string): S;
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
