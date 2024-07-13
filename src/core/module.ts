export type ExModule<ModId extends string> = {__exModule__: ModId};

export namespace ExModule {
  export const verifyModuleType = <ModId extends string>(
    _mod: ExModule<ModId> & {__meta__?: never}
  ): void => {
    // do nothing because this function is used for type check
  };
}
