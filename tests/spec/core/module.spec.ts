import {ExModuleDef} from '../../../src/core/module';

namespace Mod {
  export const __exModule__ = 'ExModule.Tests.Spec.Core.Module.Mod';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModuleDef.verify(Mod);

describe('ExModule', () => {
  test('replicate defmodule and can define function', () => {
    const r = Mod.greet('tester');
    expect(r).toBe('Hi tester.');
  });
});
