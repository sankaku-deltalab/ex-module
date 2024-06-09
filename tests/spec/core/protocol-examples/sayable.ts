import {ExProtocol} from '../../../../src/core/protocol';

const sayKey = Symbol('ExModule.Example.Say');
export type Sayable<IdType> = ExProtocol.DefProtocolType<
  typeof sayKey,
  {idType: IdType}
>;

export interface SayProtocol<
  Struct extends Sayable<unknown> = Sayable<unknown>
> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet<S extends Struct>(v: S, target: string): [string, S];

  /**
   * Get ID of self.
   *
   * @param v Self.
   */
  myId<S extends Struct>(v: S): Sayable.IdType<S>;
}

export namespace Sayable {
  export const __meta__ = ExProtocol.genMeta<SayProtocol>(sayKey);

  export type IdType<S extends Sayable<unknown>> = ExProtocol.ProtocolGenerics<
    typeof sayKey,
    S,
    'idType'
  >;

  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  export const greet = __meta__.func('greet');

  /**
   * Get ID of self.
   *
   * @param v Self.
   */
  export const myId = __meta__.func('myId');
}
