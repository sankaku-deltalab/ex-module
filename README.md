# ExModule

Forbidden dark Elixir of a alchemist

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
import {OneOfExStruct, ImplSayForOneOfExS} from '../modules/one-of-ex-struct';
import {
  OneOfExStruct2,
  ImplSayForOneOfExS2,
} from '../modules/one-of-ex-struct2';

export interface SayProtocol<T extends ExStruct> {
  say(v: T): string;
}

export const Say = ExProtocol.accumulate({
  [OneOfExStruct.__exModule__]: new ImplSayForOneOfExS(),
  [OneOfExStruct2.__exModule__]: new ImplSayForOneOfExS2(),
});

// modules/one-of-ex-struct.ts
import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from 'ex-module';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.OneOfExStruct';
type ModId = typeof modId;

export namespace OneOfExStruct {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(OneOfExStruct);
  export type T = DefExStruct<ModId, {name: string}>;

  export function create(name: string): T {
    return __meta__.gen({name});
  }
}
verifyExModuleForStruct<ModId, OneOfExStruct.T>(OneOfExStruct);

// defimpl
export class ImplSayForOneOfExS implements SayProtocol<OneOfExStruct.T> {
  say(v: OneOfExStruct.T): string {
    return 'Im ' + v.name;
  }
}

// modules/one-of-ex-struct.ts
import {
  DefExStruct,
  ExStructDef,
  verifyExModuleForStruct,
} from 'ex-module';
import {SayProtocol} from '../protocols/say';

const modId = 'MyApp.Modules.OneOfExStruct2';
type ModId = typeof modId;

export namespace OneOfExStruct2 {
  export const __exModule__ = modId;
  export const __meta__ = ExStructDef.meta<ModId, T>(OneOfExStruct2);
  export type T = DefExStruct<ModId, {greed: string}>;

  export function create(greed: string): T {
    return __meta__.gen({greed});
  }
}
verifyExModuleForStruct<ModId, OneOfExStruct2.T>(OneOfExStruct2);

// defimpl
export class ImplSayForOneOfExS2 implements SayProtocol<OneOfExStruct2.T> {
  say(v: OneOfExStruct2.T): string {
    return v.greed + ' Sir.';
  }
}

// usage.ts
import {OneOfExStruct} from './modules/one-of-ex-struct';
import {OneOfExStruct2} from './modules/one-of-ex-struct2';
import {Say} from './protocols/say';

console.log(ExampleModule.greet('Me'));

const cat = OneOfExStruct.create('souseki');
console.log(Say.of(cat).say(cat));

const dog = OneOfExStruct2.create('Wan');
console.log(Say.of(dog).say(dog));

const dogOrCat: OneOfExStruct.T | OneOfExStruct2.T = cat;
console.log(Say.of(dogOrCat).say(dogOrCat));
```
