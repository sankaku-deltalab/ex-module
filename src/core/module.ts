export type ExModule<ModId extends string> = {__exModule__: ModId};

export const verifyExModule = <ModId extends string>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mod: ExModule<ModId>
): void => {
  // do nothing because this function is used for type check
};
