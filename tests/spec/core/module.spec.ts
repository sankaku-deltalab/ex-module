import {ExModule} from '../../../src/core/module';

namespace Mod {
  export const __exModule__ = 'ExModule.Tests.Spec.Core.Module.Mod';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModule.verify(Mod);

describe('ExModule', () => {
  test('replicate defmodule and can define function', () => {
    const r = Mod.greet('tester');
    expect(r).toBe('Hi tester.');
  });
});
