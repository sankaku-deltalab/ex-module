import {ExModuleDef} from '@dark-elixir/ex-module';

// defmodule ------
export namespace ExampleModule {
  export const __exModule__ = 'MyApp.Modules.ExampleModule';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModuleDef.verify(ExampleModule);

// use module
console.log(ExampleModule.greet('Me'));
