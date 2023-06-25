import {ExModuleDef} from '@dark-elixir/ex-module';

// defmodule ------
export namespace ExampleModule {
  export const __exModule__ = 'ExModuleExample.ModuleExample.ExampleModule';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModuleDef.verify(ExampleModule);

// use module
console.log(ExampleModule.greet('Me'));
