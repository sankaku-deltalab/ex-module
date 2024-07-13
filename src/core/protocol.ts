import {ExStruct} from './struct';

type ProtocolKey = symbol;
type ProtocolImplKey = string;

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

  //
  // state
  //

  // [ProtocolKey, ProtocolImplKey] => ProtocolBase
  const protocolMap = new Map<
    ProtocolKey,
    Map<ProtocolImplKey, typeof ProtocolBase<any>>
  >();

  export function registerProtocolImpl(
    protocolKey: ProtocolKey,
    implKey: ProtocolImplKey,
    impl: typeof ProtocolBase<any>
  ) {
    let implMap = protocolMap.get(protocolKey);
    if (!implMap) {
      implMap = new Map();
      protocolMap.set(protocolKey, implMap);
    }
    implMap.set(implKey, impl);
  }

  export function getProtocolImpl<PB, S extends ExStruct = ExStruct>(
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
}
