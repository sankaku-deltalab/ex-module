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

export namespace ExStructDef {
  export type DefExStruct<ModId extends string, St extends {}> = {
    __exStruct__: ModId;
  } & St;

  export const meta = <ModId extends string, Struct extends ExStruct<ModId>>(
    mod: ExModule<ModId>
  ) => {
    return {
      gen: gen<ModId, Struct>(mod),
      isInstance: isInstance<Struct>(mod),
    };
  };

  export const verify = <
    ModId extends string,
    Structure extends ExStruct<ModId>
  >(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mod: ExModuleForStruct<ModId, Structure>
  ): void => {
    // do nothing because this function is used for type check
  };

  const isInstance =
    <Struct extends ExStruct<string>>(mod: ExModule<string>) =>
    (maybeStruct: unknown): maybeStruct is Struct => {
      return (
        typeof maybeStruct === 'object' &&
        maybeStruct !== null &&
        '__exStruct__' in maybeStruct &&
        maybeStruct['__exStruct__'] === mod.__exModule__
      );
    };

  const gen =
    <ModId extends string, Struct extends ExStruct<ModId>>(
      mod: ExModule<ModId>
    ) =>
    (v: Omit<Struct, '__exStruct__'>): Struct => {
      return {
        ...v,
        __exStruct__: mod.__exModule__,
      } as Struct;
    };
}
