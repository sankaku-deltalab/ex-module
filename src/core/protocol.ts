import {ExStruct} from './struct';

export interface ExProtocolImpl<
  Protocol,
  Implements extends Record<string, Protocol>
> {
  of<ModId extends string & keyof Implements>(
    s: ExStruct<ModId>
  ): Implements[ModId];
}

class ExProtocolImplClass<
  Protocol,
  Implements extends Record<string, Protocol>
> {
  constructor(private readonly impls: Implements) {}

  of<ModId extends string & keyof Implements>(
    s: ExStruct<ModId>
  ): Implements[ModId] {
    return this.impls[s.__exStruct__];
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ExProtocol {
  export const accumulate = <
    Protocol,
    Implements extends Record<string, Protocol>
  >(
    impls: Implements
  ): ExProtocolImpl<Protocol, Implements> => {
    return new ExProtocolImplClass(impls);
  };
}
