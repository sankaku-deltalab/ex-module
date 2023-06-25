import {ExProtocol} from '@dark-elixir/ex-module';
import {ImplSayForSwampMan, SwampMan} from './swamp-man';
import {Gentleman, ImplSayForGentleman} from './gentleman';

export type Say = SwampMan | Gentleman;
const genMethod = ExProtocol.accumulate<SayProtocol<Say>>({
  [SwampMan.__exModule__]: new ImplSayForSwampMan(),
  [Gentleman.__exModule__]: new ImplSayForGentleman(),
});

export namespace Say {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  export const greet = genMethod('greet');
}

export interface SayProtocol<Base> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet<S extends Base>(v: S, target: string): S;
}
