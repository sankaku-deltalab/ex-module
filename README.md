# ExModule

Forbidden dark Elixir of an alchemist

## Motivation

Replicate the module system of [Elixir](https://elixir-lang.org) to achieve polymorphism in a serializable state.

Implemented:

- `defmodule`
- `defstruct`
- `defprotocol` and `defimpl`

## Usage

### defmodule

```elixir
# In Elixir
defmodule ExModule.Example.ExampleModule do
  def greet(name) when is_bitstring(name) do
    "Hi #{name}."
  end
end
```

```typescript
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

```

### defstruct

```elixir
# In Elixir
defmodule ExModule.Example.Person do
  defstruct [:name]

  def greet(%__MODULE__{name: name}) do
    "Hi #{name}."
  end
end
```

```typescript
import {ExStruct} from '@dark-elixir/ex-module';

export type Person = ExStruct.DefStruct<
  typeof Person.__exModule__,
  {
    name: string;
  }
>;

export namespace Person {
  export const __exModule__ = 'ExModule.Example.Person';
  export const __meta__ = ExStruct.genMeta<Person>(Person);

  export function create(name: string): Person {
    return __meta__.gen({name});
  }

  export function greet(p: Person): string {
    return `Hi ${p.name}.`;
  }
}
ExStruct.verifyModuleType<Person>(Person);

// usage
const me = Person.create('Me');
console.log(Person.greet(me));

```

### defprotocol

```elixir
# in Elixir
defprotocol ExModule.Example.ExEnumerable do
  def map(v, fn)
end
```

```typescript
import {ExProtocol} from '@dark-elixir/ex-module';

export type ExEnumerable<T> = ExProtocol.DefType<typeof ExEnumerable.key, [T]>;

export interface ExEnumerableProtocol<T> {
  map<U>(fn: (value: T) => U): U[];
}

export namespace ExEnumerable {
  export const key = Symbol('ExModule.Example.ExEnumerable');

  function v<T>(s: ExEnumerable<T>): ExEnumerableProtocol<T> {
    return ExProtocol.getProtocolImpl<ExEnumerableProtocol<T>>(ExEnumerable, s);
  }

  export function map<T, U>(s: ExEnumerable<T>, fn: (value: T) => U): U[] {
    return v(s).map(fn);
  }
}
ExProtocol.verifyModuleType(ExEnumerable);
```

### defimpl

```elixir
# in Elixir
defmodule ExModule.Example.ExMap do
  defstruct [:map]
end

defimpl ExModule.Example.ExMap, for: ExModule.Example.ExEnumerable do
  alias ExModule.Example.ExMap

  def map(%ExMap{map: map}, fn) do
    Enum.map(map, fn)
  end
end
```

```typescript
import {ExProtocol, ExStruct} from '@dark-elixir/ex-module';
import {ExEnumerable, ExEnumerableProtocol} from './ex-enumerable';

export type ExMap<K extends string, V> = ExStruct.DefStruct<
  typeof ExMap.__exModule__,
  {map: Record<K, V>}
> &
  ExEnumerable<[K, V]>;

export namespace ExMap {
  export const __exModule__ = 'ExModule.Example.ExMap';
  export const __meta__ = ExStruct.genMeta<ExMap<string, unknown>>(ExMap);

  export function create<K extends string, V>(map: Record<K, V>): ExMap<K, V> {
    return __meta__.gen({map});
  }
}

export class ImplExEnumerableForExMap<K extends string, V>
  extends ExProtocol.ProtocolBase<ExMap<K, V>>
  implements ExEnumerableProtocol<[K, V]>
{
  map<U>(fn: (value: [K, V]) => U): U[] {
    const items = Object.entries(this.value.map) as [K, V][];
    return items.map(fn);
  }
}
ExProtocol.registerProtocolImpl(ExEnumerable, ExMap, ImplExEnumerableForExMap);

// usage
const list1 = ExList.create([1, 2, 3]);
const fnList1 = (value: number) => value * 2;
const list1Array = ExEnumerable.map(list1, fnList1); // number[]
console.log(list1Array);
```
