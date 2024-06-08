import {ExStruct} from '../../../../src/core/struct';
import {ExProtocol} from '../../../../src/core/protocol';

const sayKey = Symbol('ExModule.Example.Say');
export type Sayable<IdType> = ExProtocol.DefProtocolType<typeof sayKey, IdType>;

export interface SayProtocol<S extends ExStruct, IdType> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet(v: S, target: string): [string, S];

  /**
   * Get ID of self.
   *
   * @param v Self.
   */
  myId(v: S): IdType;
}

export namespace Sayable {
  export const __meta__ =
    ExProtocol.genMeta<SayProtocol<ExStruct, unknown>>(sayKey);

  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  export const greet = __meta__.func('greet');
}
