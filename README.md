# ExModule

Forbidden dark Elixir of an alchemist

## Motivation

Replicate the module system of [Elixir](https://elixir-lang.org) to achieve polymorphism in a serializable state.

## Usage

### defmodule

```elixir
# In Elixir
defmodule ExModuleExample.ModuleExample.ExampleModule do
  def greet(name) when is_bitstring(name) do
    "Hi #{name}."
  end
end
```

```typescript
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

```

### defstruct

```elixir
# In Elixir
defmodule MyApp.Modules.ExampleStruct do
  defstruct [:name]

  def greet(%__MODULE__{name: name}) do
    "Hi #{name}."
  end
end
```

```typescript
import {ExStructDef} from '@dark-elixir/ex-module';

const moduleName = 'ExModuleExample.StructExample.ExampleStruct';

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
```

### defprotocol, defimpl

```elixir
# in Elixir
defprotocol ExModuleExample.ProtocolExample.Greetable do
  @spec greet(t, String.t()) :: t
  def greet(v, target)
end

defmodule ExModuleExample.ProtocolExample.Gentleman do
  defstruct [:greet]
end

defimpl ExModuleExample.ProtocolExample.Greetable, for: ExModuleExample.ProtocolExample.Gentleman do
  alias ExModuleExample.ProtocolExample.Gentleman

  @spec greet(Gentleman.t(), String.t()) :: Gentleman.t()
  def greet(%Gentleman{greet: greet} = v, target) do
    IO.inspect("#{greet}, #{target}.")
    v
  end
end

defmodule ExModuleExample.ProtocolExample.SwampMan do
  defstruct [:name]
end

defimpl ExModuleExample.ProtocolExample.Greetable, for: ExModuleExample.ProtocolExample.SwampMan do
  alias ExModuleExample.ProtocolExample.SwampMan

  @spec greet(SwampMan.t(), String.t()) :: SwampMan.t()
  def greet(%SwampMan{name: name} = v, target) do
    IO.inspect("Hello #{target}. Im #{name}.")
    v
  end
end
```

```typescript
// protocol-examples/greetable.ts
import {ExProtocol} from '@dark-elixir/ex-module';
import {ImplSayForSwampMan, SwampMan} from './swamp-man';
import {Gentleman, ImplSayForGentleman} from './gentleman';

export type Greetable = SwampMan | Gentleman;

export namespace Greetable {
  const genMethod = ExProtocol.accumulate<GreetableProtocol<Greetable>>({
    [SwampMan.__exModule__]: new ImplSayForSwampMan(),
    [Gentleman.__exModule__]: new ImplSayForGentleman(),
  });

  export const greet = genMethod('greet');
}

export interface GreetableProtocol<Base> {
  greet(v: Base, target: string): Base;
}

// protocol-examples/gentleman.ts
import {ExStructDef} from '@dark-elixir/ex-module';
import {GreetableProtocol} from './greetable';

const moduleName = 'ExModuleExample.ProtocolExample.Gentleman';

export type Gentleman = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    greed: string;
  }
>;

export namespace Gentleman {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<Gentleman>(Gentleman);

  export function create(greed: string): Gentleman {
    return __meta__.gen({greed});
  }
}
ExStructDef.verify<Gentleman>(Gentleman);

// defimpl ------
export class ImplSayForGentleman implements GreetableProtocol<Gentleman> {
  greet(v: Gentleman, target: string): Gentleman {
    console.log(`${v.greed}, ${target}.`);
    return v;
  }
}

// protocol-examples/swamp-man.ts
import {ExStructDef} from '@dark-elixir/ex-module';
import {GreetableProtocol} from './greetable';

const moduleName = 'ExModuleExample.ProtocolExample.SwampMan';

export type SwampMan = ExStructDef.DefExStruct<
  typeof moduleName,
  {
    name: string;
  }
>;

export namespace SwampMan {
  export const __exModule__ = moduleName;
  export const __meta__ = ExStructDef.meta<SwampMan>(SwampMan);

  export function create(name: string): SwampMan {
    return __meta__.gen({name});
  }
}
ExStructDef.verify<SwampMan>(SwampMan);

// defimpl ------
export class ImplSayForSwampMan implements GreetableProtocol<SwampMan> {
  greet(v: SwampMan, target: string): SwampMan {
    console.log(`Hello ${target}. Im ${v.name}.`);
    return SwampMan.create(target);
  }
}
```
