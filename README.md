# ExModule

Forbidden dark Elixir of an alchemist

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
import {verifyExModule} from 'ex-module';

const modId = 'MyApp.Modules.ExampleModule';
type ModId = typeof modId;

export namespace ExampleModule {
  export const __exModule__ = modId;

  export function greet(name: string): string {
    return `Hi ${name}.`;
  }
}
verifyExModule<ModId>(ExampleModule);
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
import {verifyExModule} from 'ex-module';

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
```

### defprotocol, defimpl

```elixir
# in Elixir
defprotocol Say do
  @spec type(t) :: String.t()
  def say(v)
end

defmodule OneOfExStruct do
  defstruct [:name]

  defimpl Say, for: OneOfExStruct do
    def say(%OneOfExStruct{name}), do: 'Im ' <> name;
  end
end

defmodule OneOfExStruct2 do
  defstruct [:greet]

  defimpl Say, for: OneOfExStruct2 do
    def say(%OneOfExStruct2{greet}), do: greet <> " Sir.";
  end
end
```

```typescript
// protocols/say.ts
import {ExProtocol, ExStruct} from 'ex-module';
import {SwampMan} from '../modules/swamp-man';
import {Gentleman} from '../modules/gentleman';

export interface SayProtocol<Base extends ExStruct> {
  greet<S extends Base>(v: S, target: string): S;
}

export namespace Say {
  export type T = SwampMan.T | Gentleman.T;

  const accumulate = ExProtocol.accumulate<SayProtocol<T>>({
    [SwampMan.__exModule__]: new SwampMan.ImplSay(),
    [Gentleman.__exModule__]: new Gentleman.ImplSay(),
  });

  export const say = accumulate('greet');
}

// modules/gentleman.ts
import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from 'ex-module';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.Gentleman';
type ModId = typeof modId;

export namespace Gentleman {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(Gentleman);
  export type T = DefExStruct<ModId, {greed: string}>;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }

  export class ImplSay implements SayProtocol<T> {
    greet<S extends T>(v: S, _target: string): S {
      console.log(`${v.greed}, Sir.`);
      return v;
    }
  }
}
verifyExModuleForStruct<ModId, Gentleman.T>(Gentleman);

// modules/swamp-man.ts
import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from 'ex-module';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.SwampMan';
type ModId = typeof modId;

export namespace SwampMan {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(SwampMan);
  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return __meta__.gen({name});
  }

  export class ImplSay implements SayProtocol<T> {
    greet<S extends T>(v: S, target: string): S {
      console.log(`Hello ${target}. Im ${v.name}.`);
      return {...v, name: target};
    }
  }
}
verifyExModuleForStruct<ModId, SwampMan.T>(SwampMan);

// usage.ts
import {Gentleman} from './modules/gentleman';
import {SwampMan} from './modules/swamp-man';
import {Say} from './protocols/say';

console.log(ExampleModule.greet('Me'));

const gentleman = Gentleman.create('Hello');
const newGentleman = Say.say(gentleman, 'unknown human');

const swampMan = SwampMan.create('mud');
const newSwampMan = Say.say(swampMan, 'gentleman');

const anyMan: Say.T = swampMan as Say.T;
const newAnyMan = Say.say(anyMan, 'who');
```
