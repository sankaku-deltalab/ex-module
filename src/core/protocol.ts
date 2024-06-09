/* eslint-disable @typescript-eslint/no-explicit-any */
import {DoubleMap} from '../utils/double-map';
import {ExModuleForStruct, ExStruct} from './struct';

type ProtocolKey = symbol;
type StructModuleName = string;

export namespace ExProtocol {
  type ExProtocolModule = {
    __meta__: ExProtocolModuleMeta<object>;
  };

  /**
   * **NOTE: Mutable**
   *
   * Registered implementations.
   * This map contains all implementations of the all protocols.
   */
  const registeredImpls = new DoubleMap<
    ProtocolKey,
    StructModuleName,
    Record<string, Function>
  >();

  /**
   * Define protocol type.
   * All protocol types should be defined by this type.
   * This type is used for only type checking.
   */
  export type DefProtocolType<
    Key extends symbol,
    Generics extends Record<string, unknown>
  > = {
    [key in Key]: Generics;
  };

  export type ProtocolGenerics<
    ProtocolKey extends symbol,
    Impl extends DefProtocolType<ProtocolKey, any>,
    Key extends string
  > = Impl[ProtocolKey][Key];

  /**
   * Generate meta for the protocol.
   * All protocol module must has `__meta__` field.
   */
  export const genMeta = <P extends object>(protocolKey: symbol) => {
    return new ExProtocolModuleMeta<P>(protocolKey);
  };

  /**
   * Register implementation.
   */
  export const registerImpl = <
    PM extends ExProtocolModule,
    StructModule extends ExModuleForStruct<string, any>,
    Protocol extends object
  >(
    protocol: PM,
    struct: StructModule,
    impl: Protocol
  ): void => {
    registeredImpls.set(
      protocol.__meta__.protocolKey,
      struct.__exModule__,
      impl as Record<string, Function>
    );
  };

  class ExProtocolModuleMeta<Protocol extends object> {
    constructor(readonly protocolKey: ProtocolKey) {}

    /**
     * Create function.
     *
     * That function will call the implementation of the protocol.
     * If the implementation is not found, it will call given default function.
     *
     * NOTE: All implemented function take the first argument as the struct.
     */
    func<FuncName extends string & keyof Protocol>(
      funcName: FuncName,
      defaultFunc?: Protocol[FuncName] & Function
    ): Protocol[FuncName] {
      const fn = (struct: ExStruct, ...args: unknown[]) => {
        const impl = registeredImpls.get(this.protocolKey, struct.__exStruct__);
        if (impl === undefined) {
          if (defaultFunc === undefined) {
            throw new Error(
              `Implementation for ${struct.__exStruct__} is not found.`
            );
          }
          return defaultFunc(struct, ...args);
        }
        const implFunc = impl[funcName];
        if (implFunc === undefined) {
          if (defaultFunc === undefined) {
            throw new Error(
              `Implementation for ${struct.__exStruct__}.${funcName} is not found.`
            );
          }
          return defaultFunc(struct, ...args);
        }
        return implFunc(struct, ...args);
      };
      return fn as any as Protocol[FuncName];
    }
  }
}
