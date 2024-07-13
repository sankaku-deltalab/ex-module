import {ExProtocol} from '../../../../src/core/protocol';

export type Sayable<IdType> = ExProtocol.DefType<typeof Sayable.key, [IdType]>;

export interface SayableProtocol<IdType> {
  /**
   * Play greeting and update self.
   *
   * @param target Greeting target.
   */
  greet(target: string): [string, Sayable<IdType>];

  /**
   * Get ID of self.
   */
  myId(): IdType;
}

export namespace Sayable {
  export const key = Symbol('ExModule.Example.Say');

  function v<IdType>(s: Sayable<IdType>): SayableProtocol<IdType> {
    return ExProtocol.getProtocolImpl<SayableProtocol<IdType>>(Sayable, s);
  }

  /**
   * Play greeting and update self.
   *
   * @param s Self.
   * @param target Greeting target.
   */
  export function greet<IdType>(
    s: Sayable<IdType>,
    target: string
  ): [string, Sayable<IdType>] {
    return v(s).greet(target);
  }

  /**
   * Get ID of self.
   *
   * @param s Self.
   */
  export function myId<IdType>(s: Sayable<IdType>): IdType {
    return v(s).myId();
  }
}
