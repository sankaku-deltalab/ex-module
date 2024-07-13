import {ExProtocol} from '../../../../src/core/protocol';

export type ExEnumerable<T> = ExProtocol.DefType<typeof ExEnumerable.key, [T]>;

export interface ExEnumerableProtocol<T> {
  toArray(args1: unknown, args2: unknown): T[];
}

export namespace ExEnumerable {
  export const key = Symbol('ExModule.MyApp.ExEnumerable');

  function v<T>(s: ExEnumerable<T>): ExEnumerableProtocol<T> {
    return ExProtocol.getProtocolImpl<ExEnumerableProtocol<T>>(ExEnumerable, s);
  }

  export function toArray<T>(
    s: ExEnumerable<T>,
    args1: unknown,
    args2: unknown
  ): T[] {
    return v(s).toArray(args1, args2);
  }
}
