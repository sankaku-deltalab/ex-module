export type ExModule<ModId extends string> = {__exModule__: ModId};

export namespace ExModuleDef {
  export const verify = <ModId extends string>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mod: ExModule<ModId> & {__meta__?: never}
  ): void => {
    // do nothing because this function is used for type check
  };
}
