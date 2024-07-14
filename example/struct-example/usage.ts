import {ExStruct} from '@dark-elixir/ex-module';

export type Person = ExStruct.DefStruct<
  typeof Person.__exModule__,
  {
    name: string;
  }
>;

export namespace Person {
  export const __exModule__ = 'ExModule.Example.Person';
  export const __meta__ = ExStruct.genMeta<Person>(Person);

  export function create(name: string): Person {
    return __meta__.gen({name});
  }

  export function greet(p: Person): string {
    return `Hi ${p.name}.`;
  }
}
ExStruct.verifyModuleType<Person>(Person);

// usage
const me = Person.create('Me');
console.log(Person.greet(me));
