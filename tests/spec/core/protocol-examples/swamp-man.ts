import {ExProtocol} from '../../../../src/core/protocol';
import {ExStruct} from '../../../../src/core/struct';
import {Sayable, SayableProtocol} from './sayable';

export type SwampMan = ExStruct.DefStruct<
  typeof SwampMan.__exModule__,
  {
    originalId: string;
    copiedCount: number;
    name: string;
  } & Sayable<[string, number]>
>;

export namespace SwampMan {
  export const __exModule__ = 'MyApp.Modules.SwampMan';
  export const __meta__ = ExStruct.genMeta<SwampMan>(SwampMan);

  export function create(
    originalId: string,
    copiedCount: number,
    name: string
  ): SwampMan {
    return __meta__.gen({originalId, copiedCount, name});
  }
}
ExStruct.verifyModuleType<SwampMan>(SwampMan);

// defimpl ------
export class ImplSayForSwampMan
  extends ExProtocol.ProtocolBase<SwampMan>
  implements SayableProtocol<[string, number]>
{
  greet(target: string): [string, Sayable<[string, number]>] {
    const v = this.value;
    return [
      `Hello ${target}. Im ${v.name}.`,
      SwampMan.create(v.originalId, v.copiedCount + 1, target),
    ];
  }

  myId(): [string, number] {
    const v = this.value;
    return [v.originalId, v.copiedCount];
  }
}
ExProtocol.registerProtocolImpl(Sayable, SwampMan, ImplSayForSwampMan);
