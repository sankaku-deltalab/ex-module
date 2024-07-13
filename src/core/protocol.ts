import {ExModule} from './module';
import {ExStruct} from './struct';

type ProtocolKey = symbol;
type StructModuleName = string;

export namespace ExProtocol {
  //
  // core
  //

  export class ProtocolBase<V> {
    protected readonly value: V;

    constructor(value: V) {
      this.value = value;
    }
  }

  type ExModuleForProtocol<PKey extends ProtocolKey = ProtocolKey> = {
    key: PKey;
  };

  //
  // state
  //

  // [ProtocolKey, ProtocolImplKey] => ProtocolBase
  const protocolMap = new Map<
    ProtocolKey,
    Map<StructModuleName, typeof ProtocolBase<any>>
  >();

  export function registerProtocolImpl(
    protocolModule: ExModuleForProtocol,
    structModule: ExModule<string>,
    impl: typeof ProtocolBase<any>
  ): void {
    registerProtocolImplRaw(
      protocolModule.key,
      structModule.__exModule__,
      impl
    );
  }

  export function getProtocolImpl<PB, S extends ExStruct = ExStruct>(
    protocolModule: ExModuleForProtocol,
    struct: S
  ): PB {
    return getProtocolImplRaw(protocolModule.key, struct);
  }

  function registerProtocolImplRaw(
    protocolKey: ProtocolKey,
    implKey: StructModuleName,
    impl: typeof ProtocolBase<any>
  ): void {
    let implMap = protocolMap.get(protocolKey);
    if (!implMap) {
      implMap = new Map();
      protocolMap.set(protocolKey, implMap);
    }
    implMap.set(implKey, impl);
  }

  function getProtocolImplRaw<PB, S extends ExStruct = ExStruct>(
    protocolKey: ProtocolKey,
    struct: S
  ): PB {
    const protocolClass = protocolMap
      .get(protocolKey)
      ?.get(struct.__exStruct__);
    if (!protocolClass) {
      throw new Error('No protocol found for the given key.');
    }
    return new protocolClass(struct) as PB;
  }

  //
  // Util
  //

  export type DefType<
    PKey extends symbol,
    Generics extends unknown[]
  > = Partial<Record<PKey, Generics>> & ExStruct;

  export const verifyModuleType = (_mod: ExModuleForProtocol): void => {
    // do nothing because this function is used for type check
  };
}
