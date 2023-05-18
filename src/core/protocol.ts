import {ExStruct} from './struct';

export class ExProtocolImpl<Protocol, Impls extends Record<string, Protocol>> {
  constructor(private readonly impls: Impls) {}

  of<ModId extends string & keyof Impls>(s: ExStruct<ModId>): Impls[ModId] {
    return this.impls[s.__exStruct__];
  }
}
