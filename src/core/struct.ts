/* eslint-disable @typescript-eslint/no-explicit-any */
import {ExModule} from './module';

export type ExStruct<
  ModId extends string = any,
  RawStructure extends {} = {}
> = RawStructure & {__exStruct__: ModId};

export type ExModuleForStruct<
  ModId extends string,
  RawStructure extends {}
> = ExModule<ModId> & {
  __meta__: {
    isInstance: (
      maybeStruct: unknown
    ) => maybeStruct is ExStruct<ModId, RawStructure>;
    gen: (v: RawStructure) => ExStruct<ModId, RawStructure>;
  };
};

export namespace ExStruct {
  type ModIdOf<S extends ExStruct> = S['__exStruct__'];

  export type DefStruct<ModId extends string, St extends {}> = {
    __exStruct__: ModId;
  } & St;

  export const genMeta = <Struct extends ExStruct>(
    mod: ExModule<ModIdOf<Struct>>
  ) => {
    return {
      gen: gen<ModIdOf<Struct>, Struct>(mod),
      isInstance: isInstance<Struct>(mod),
    };
  };

  export const verifyModuleType = <Struct extends ExStruct>(
    _mod: ExModuleForStruct<ModIdOf<Struct>, Struct>
  ): void => {
    // do nothing because this function is used for type check
  };

  const isInstance =
    <Struct extends ExStruct<string>>(mod: ExModule<string>) =>
    (maybeStruct: any): maybeStruct is Struct => {
      return maybeStruct['__exStruct__'] === mod.__exModule__;
    };

  const gen =
    <ModId extends string, Struct extends ExStruct<ModId>>(
      mod: ExModule<ModId>
    ) =>
    <S extends Struct = Struct>(v: Omit<S, '__exStruct__' | symbol>): S => {
      return {
        ...v,
        __exStruct__: mod.__exModule__,
      } as S;
    };
}
