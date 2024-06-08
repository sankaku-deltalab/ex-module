import {ExProtocol} from '../../../../src/core/protocol';
import {ExStruct} from '../../../../src/core/struct';
import {SayProtocol, Sayable} from './sayable';

export type Gentleman = ExStruct.DefStruct<
  typeof Gentleman.__exModule__,
  {
    id: string;
    greet: string;
  } & Sayable<string>
>;

export namespace Gentleman {
  export const __exModule__ = 'MyApp.Modules.Gentleman';
  export const __meta__ = ExStruct.genMeta<Gentleman>(Gentleman);

  export function create(id: string, greet: string): Gentleman {
    return __meta__.gen({id, greet});
  }
}
ExStruct.verify<Gentleman>(Gentleman);

// defimpl ------
export class ImplSayForGentleman implements SayProtocol<Gentleman, string> {
  greet<S extends Gentleman>(v: S, target: string): [string, S] {
    return [`${v.greet}, Sir ${target}.`, v];
  }

  myId<S extends Gentleman>(v: S): string {
    return v.id;
  }
}
ExProtocol.registerImpl(Sayable, Gentleman, new ImplSayForGentleman());
