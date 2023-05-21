/* eslint-disable @typescript-eslint/no-explicit-any */
import {ExStruct} from './struct';

export namespace ExProtocol {
  export const accumulate =
    <Protocol extends Object>(impls: Record<string, {}>) =>
    <FuncName extends keyof Protocol>(
      funcName: FuncName
    ): Protocol[FuncName] => {
      const f = (v: ExStruct, ...args: any[]): any => {
        const impl: Record<FuncName, Function> = impls[v.__exStruct__] as any;
        return impl[funcName](v, ...args);
      };
      return f as any as Protocol[FuncName];
    };
}
