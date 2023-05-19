import {ExModule} from './module';

export type ExStruct<
  ModId extends string = string,
  RawStructure extends {} = {}
> = RawStructure & {__exStruct__: ModId};

export type ExModuleForStruct<
  ModId extends string,
  RawStructure extends {}
> = ExModule<ModId> & {
  isInstance: (
    maybeStruct: unknown
  ) => maybeStruct is ExStruct<ModId, RawStructure>;
  gen: (v: RawStructure) => ExStruct<ModId, RawStructure>;
};

export type DefExStruct<ModId extends string, St extends {}> = {
  __exStruct__: ModId;
} & St;

export const verifyExModuleForStruct = <
  ModId extends string,
  Structure extends ExStruct<ModId>
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mod: ExModuleForStruct<ModId, Structure>
): void => {
  // do nothing because this function is used for type check
};

export namespace ExStructDef {
  export const isInstance =
    <Struct extends ExStruct<string>>(mod: ExModule<string>) =>
    (maybeStruct: unknown): maybeStruct is Struct => {
      return (
        typeof maybeStruct === 'object' &&
        maybeStruct !== null &&
        '__exStruct__' in maybeStruct &&
        maybeStruct['__exStruct__'] === mod.__exModule__
      );
    };

  export const gen =
    <ModId extends string, Structure extends ExStruct<ModId>>(
      mod: ExModule<ModId>
    ) =>
    (v: Omit<Structure, '__exStruct__'>): Structure => {
      return {
        ...v,
        __exStruct__: mod.__exModule__,
      } as Structure;
    };
}
