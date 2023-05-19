import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from '../../core/struct';

const modId = 'MyApp.Modules.ExampleStruct';
type ModId = typeof modId;

export namespace ExampleStruct {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(ExampleStruct);
  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return __meta__.gen({name});
  }

  export function greet({name}: ExampleStruct.T): string {
    return `Hi ${name}.`;
  }
}
verifyExModuleForStruct<ModId, ExampleStruct.T>(ExampleStruct);
