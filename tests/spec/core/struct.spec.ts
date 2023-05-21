import {ExStructDef} from '../../../src/core/struct';

export namespace ModOfStruct {
  export const __exModule__ = 'ExModule.Tests.Spec.Core.Module.ModOfStruct';
  export const __meta__ = ExStructDef.meta<T>(ModOfStruct);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      name: string;
    }
  >;

  export function create(name: string): T {
    return __meta__.gen({name});
  }

  export function greet({name}: T): string {
    return `Hi ${name}.`;
  }
}
ExStructDef.verify<ModOfStruct.T>(ModOfStruct);

describe('ExStruct', () => {
  test('can generate struct with builtin function', () => {
    const struct = ModOfStruct.__meta__.gen({name: 'cat'});

    expect(struct).toEqual({
      __exStruct__: ModOfStruct.__exModule__,
      name: 'cat',
    });
  });

  test('can call function with struct', () => {
    const struct = ModOfStruct.__meta__.gen({name: 'cat'});
    const r = ModOfStruct.greet(struct);

    expect(r).toBe('Hi cat.');
  });
});
