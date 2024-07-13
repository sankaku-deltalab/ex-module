import {ExStruct} from '../../../src/core/struct';

export type Person = ExStruct.DefStruct<
  typeof Person.__exModule__,
  {
    name: string;
  }
>;

export namespace Person {
  export const __exModule__ = 'ExModule.Tests.Spec.Core.Module.Person';
  export const __meta__ = ExStruct.genMeta<Person>(Person);

  export function create(name: string): Person {
    return __meta__.gen({name});
  }

  export function greet(p: Person): string {
    return `Hi ${p.name}.`;
  }
}
ExStruct.verifyModuleType<Person>(Person);

describe('ExStruct', () => {
  test('can generate struct with builtin function', () => {
    const struct = Person.create('cat');

    expect(struct).toEqual({
      __exStruct__: Person.__exModule__,
      name: 'cat',
    });
  });

  test('can call function with struct', () => {
    const struct = Person.create('cat');
    const r = Person.greet(struct);

    expect(r).toBe('Hi cat.');
  });

  test('can use builtin isInstance', () => {
    const struct = Person.create('cat');
    const fakeStruct = {
      __exStruct__: 'ExModule.Tests.Spec.Core.Module.Person',
    };
    const notStruct = {
      __exStruct: 'Not.Struct',
    };

    expect(Person.__meta__.isInstance(struct)).toBe(true);
    expect(Person.__meta__.isInstance(fakeStruct)).toBe(true);
    expect(Person.__meta__.isInstance(notStruct)).toBe(false);
  });
});
