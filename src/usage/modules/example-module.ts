import {verifyExModule} from '../../core/module';

const modId = 'MyApp.Modules.ExampleModule';
type ModId = typeof modId;

export namespace ExampleModule {
  export const __exModule__ = modId;

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
verifyExModule<ModId>(ExampleModule);
