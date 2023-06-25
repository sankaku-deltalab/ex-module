import {ExStructDef} from '@dark-elixir/ex-module';

// defmodule, defstruct ------
export namespace ExampleStruct {
  export const __exModule__ = 'MyApp.Modules.ExampleStruct';
  export const __meta__ = ExStructDef.meta<T>(ExampleStruct);

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
ExStructDef.verify<ExampleStruct.T>(ExampleStruct);

// use module ------
const me = ExampleStruct.create('Me');
console.log(ExampleStruct.greet(me));
