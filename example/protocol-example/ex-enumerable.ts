import {ExProtocol} from '@dark-elixir/ex-module';

export type ExEnumerable<T> = ExProtocol.DefType<typeof ExEnumerable.key, [T]>;

export interface ExEnumerableProtocol<T> {
  map<U>(fn: (value: T) => U): U[];
}

export namespace ExEnumerable {
  export const key = Symbol('ExModule.Example.ExEnumerable');

  function v<T>(s: ExEnumerable<T>): ExEnumerableProtocol<T> {
    return ExProtocol.getProtocolImpl<ExEnumerableProtocol<T>>(ExEnumerable, s);
  }

  export function map<T, U>(s: ExEnumerable<T>, fn: (value: T) => U): U[] {
    return v(s).map(fn);
  }
}
ExProtocol.verifyModuleType(ExEnumerable);
