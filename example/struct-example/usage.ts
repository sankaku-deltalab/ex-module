import {ExStructDef} from '@dark-elixir/ex-module';

const moduleName = 'ExModuleExample.ModuleExample.ExampleModule';

export type ExampleStruct = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    name: string;
  }
>;

// defmodule, defstruct ------
export namespace ExampleStruct {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<ExampleStruct>(ExampleStruct);

  export function create(name: string): ExampleStruct {
    return __meta__.gen({name});
  }

  export function greet({name}: ExampleStruct): string {
    return `Hi ${name}.`;
  }
}
ExStructDef.verify<ExampleStruct>(ExampleStruct);

// use module ------
const me = ExampleStruct.create('Me');
console.log(ExampleStruct.greet(me));
