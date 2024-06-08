import {ExProtocol} from '../../../../src/core/protocol';
import {ExStructDef} from '../../../../src/core/struct';
import {SayProtocol, Sayable} from './sayable';

export type SwampMan = ExStructDef.DefExStruct<
  typeof SwampMan.__exModule__,
  {
    originalId: string;
    copiedCount: number;
    name: string;
  } & Sayable<[string, number]>
>;

export namespace SwampMan {
  export const __exModule__ = 'MyApp.Modules.SwampMan';
  export const __meta__ = ExStructDef.meta<SwampMan>(SwampMan);

  export function create(
    originalId: string,
    copiedCount: number,
    name: string
  ): SwampMan {
    return __meta__.gen({originalId, copiedCount, name});
  }
}
ExStructDef.verify<SwampMan>(SwampMan);

// defimpl ------
export class ImplSayForSwampMan
  implements SayProtocol<SwampMan, [string, number]>
{
  greet<S extends SwampMan>(v: S, target: string): [string, S] {
    return [
      `Hello ${target}. Im ${v.name}.`,
      {...v, name: target, copiedCount: v.copiedCount + 1},
    ];
  }

  myId<S extends SwampMan>(v: S): [string, number] {
    return [v.originalId, v.copiedCount];
  }
}
ExProtocol.registerImpl(Sayable, SwampMan, new ImplSayForSwampMan());
