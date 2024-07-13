import {ExProtocol} from '../../../../src/core/protocol';
import {ExStruct} from '../../../../src/core/struct';
import {Sayable, SayableProtocol} from './sayable';

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
ExStruct.verifyModuleType<Gentleman>(Gentleman);

// defimpl ------
export class ImplSayForGentleman
  extends ExProtocol.ProtocolBase<Gentleman>
  implements SayableProtocol<string>
{
  greet(target: string): [string, Sayable<string>] {
    return [
      `Hello ${target}. Im ${this.value.greet}.`,
      Gentleman.create(target, this.value.greet),
    ];
  }

  myId(): string {
    return this.value.id;
  }
}
ExProtocol.registerProtocolImpl(Sayable, Gentleman, ImplSayForGentleman);
