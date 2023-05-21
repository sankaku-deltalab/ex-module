# ExModule

Forbidden dark Elixir of an alchemist

## Motivation

Replicate the module system of [Elixir](https://elixir-lang.org) to achieve polymorphism in a serializable state.

## Usage

### defmodule

```elixir
# In Elixir
defmodule MyApp.Modules.ExampleModule do
  def greet(name) when is_bitstring(name) do
    "Hi #{name}."
  end
end
```

```typescript
// modules/example-module.ts
import {ExModuleDef} from 'ex-module';

// defmodule ------
export namespace ExampleModule {
  export const __exModule__ = 'MyApp.Modules.ExampleModule';

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
ExModuleDef.verify(ExampleModule);

// use module ------
console.log(ExampleModule.greet('Me'));
```

### defstruct

```elixir
# In Elixir
defmodule MyApp.Modules.ExampleStruct do
  defstruct [:name]

  def greet(%__MODULE__{name}) do
    "Hi #{name}."
  end
end
```

```typescript
// modules/example-struct.ts
import {ExStructDef} from 'ex-module';

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
```

### defprotocol, defimpl

```elixir
# in Elixir
defprotocol Say do
  @spec type(t) :: String.t()
  def say(v)
end

defmodule Gentleman do
  defstruct [:greet]

  defimpl Say, for: Gentleman do
    def greet(%Gentleman{name}, target), do
      IO.inspect("#{greed}, Sir.")
    end
  end
end

defmodule SwampMan do
  defstruct [:name]

  defimpl Say, for: SwampMan do
    def greet(%SwampMan{name}, target) do
      IO.inspect("Hello #{target}. Im #{name}.")
    end
  end
end
```

```typescript
// protocols/say.ts
import {ExProtocol, ExStruct} from 'ex-module';
import {ImplSayForSwampMan, SwampMan} from '../modules/swamp-man';
import {Gentleman, ImplSayForGentleman} from '../modules/gentleman';

export interface SayProtocol<Base extends ExStruct> {
  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  greet<S extends Base>(v: S, target: string): S;
}

export namespace Say {
  export type T = SwampMan.T | Gentleman.T;

  const genMethod = ExProtocol.accumulate<SayProtocol<T>>({
    [SwampMan.__exModule__]: new ImplSayForSwampMan(),
    [Gentleman.__exModule__]: new ImplSayForGentleman(),
  });

  /**
   * Play greeting and update self.
   *
   * @param v Self.
   * @param target Greeting target.
   */
  export const greet = genMethod('greet');
}

// modules/gentleman.ts
import {ExStructDef} from 'ex-module';
import {SayProtocol} from '../protocols/say';

export namespace Gentleman {
  export const __exModule__ = 'MyApp.Modules.Gentleman';
  export const __meta__ = ExStructDef.meta<T>(Gentleman);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      greed: string;
    }
  >;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }
}
ExStructDef.verify<Gentleman.T>(Gentleman);

// defimpl ------
type T = Gentleman.T;
export class ImplSayForGentleman implements SayProtocol<T> {
  greet<S extends T>(v: S, target: string): S {
    console.log(`${v.greed}, Sir ${target}.`);
    return v;
  }
}

// modules/swamp-man.ts
import {ExStructDef} from 'ex-module';
import {SayProtocol} from '../protocols/say';

export namespace SwampMan {
  export const __exModule__ = 'MyApp.Modules.SwampMan';
  export const __meta__ = ExStructDef.meta<T>(SwampMan);

  export type T = ExStructDef.DefExStruct<
    typeof __exModule__,
    {
      name: string;
    }
  >;

  export function create(name: string): T {
    return __meta__.gen({name});
  }
}
ExStructDef.verify<SwampMan.T>(SwampMan);

// defimpl ------
type T = SwampMan.T;
export class ImplSayForSwampMan implements SayProtocol<T> {
  greet<S extends T>(v: S, target: string): S {
    console.log(`Hello ${target}. Im ${v.name}.`);
    return {...v, name: target};
  }
}


// usage.ts
import {Gentleman} from './modules/gentleman';
import {SwampMan} from './modules/swamp-man';
import {Say} from './protocols/say';

const gentleman = Gentleman.create('Hello');
const newGentleman = Say.greet(gentleman, 'unknown human');
console.log(newGentleman);

const swampMan = SwampMan.create('mud');
const newSwampMan = Say.greet(swampMan, 'gentleman');
console.log(newSwampMan);

const anyMan: Say.T = swampMan as Say.T;
const newAnyMan = Say.greet(anyMan, 'who');
console.log(newAnyMan);
```
