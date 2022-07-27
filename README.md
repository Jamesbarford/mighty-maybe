# Mighty Maybe

Yet another `Maybe` library. This uses a simple type of `T | null | undefined` and provides a callback functions that operate on a `Maybe`. This aims to be a zero overhead abstraction.

```typescript
import { Maybe, maybePipe, mapMaybe } from "mighty-maybe";

const someValue = //...

const maybeResult: Maybe<number> = maybePipe(someValue,
  x => x.foo,
  y => y.bar,
  z => z * 24
);

const foo: Maybe<number> = undefined;

mapMaybe(foo, x => x * 69);
```

# Base type

No classes, only 2 simple types.

```typescript
type Maybe<T> = T | null | undefined;

export type OperatorMaybeFunction<T, V> = (val: NonNullable<T>) => V;
```

# Functions

Example:

## `isMaybe(arg: any)`

Return true if value is `null` or `undefined`.

```typescript
isMaybe(null); // true
isMaybe(undefined); // true

const arr: number[] = [];
isMaybe(arr.length); // false
```

## `maybeFirst<T>(maybes: Maybe<T>[], cb: (val: T) => V): Maybe<V>`

Calls callback `cb` on first non `Maybe<T>` value from an array of maybes.

```typescript
maybeFirst([null, null, 32]); // 32
```

## `maybeMap<T, V>(maybe: Maybe<V>, cb: (val: V) => V): Maybe<V>`

Invoke callback on `Maybe` returning the value or null

```typescript
mapMaybe<number, string>(42, x => String(x)); // "42"
mapMaybe<number, string>(undefined, x => String(x)); // null
```

## `maybeMapOrElse<T, V>(maybe: Maybe<T>, cb: OperatorMaybeFunction<T, V>) => Maybe<V>`

Call function on maybe or fallback to a defined callback

```ts
const value: Maybe<number> = 2

maybeMapOrElse(value, val => val * 22, () => 42);
```

## `maybePipe<T, ...Y>(maybe: Maybe<T>, ...operations: )`
Chain a series of callbacks on a `Maybe<T>`

```typescript
const someUntypedObject: Record<string, number> = {};
 *
maybePipe<number>(someObject,
		x => x.foo,
		y => y != 42 ? y : null,
		z => z + 2
);
 *
// Or with the pre-defined operations
 *
const someUntypedObject: Record<string, number> = {};
 *
maybePipe<number>(someObject,
		maybeOpMap(x => x.foo),
		maybeOpFilter(y => y != 42)
		maybeOpMap(z => z + 2)
);
```

## maybeMapAll<...S1, V>(maybes: Maybe<...S1>[], cb: (val: ...S1[]) => V): Maybe<V>

Invoke callback on array of maybes only if _all_ of the maybes are NonNullable. Here the callback function would not get invoked as `circle2` is null:

Usage:
```ts
type Circle = {
  x: number;
  y: number;
};
const list: Circle[] = [{ x:10, y:2 }, null, {x:20, y: 69}];
maybeMapAll(list, [circle1, circle2, circle3] => {
  // logic...
});
```
