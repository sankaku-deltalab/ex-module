import {ExModule} from '@dark-elixir/ex-module';

namespace ExampleModule {
  export const __exModule__ = 'ExModule.Example.ExampleModule';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModule.verifyModuleType(ExampleModule);

// usage
console.log(ExampleModule.greet('Me'));
