# @lilbunnyrabbit/optional

[TypeScript](https://www.typescriptlang.org/) implementation of [java.util.Optional<T>](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html).

> **Definition**
> A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
> Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present).
>
> This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.

The main difference is that it doesn't throw errors if the value is not defined and simply just returns `null`.

## Classes

### OptionalValue\<T\>

A [TypeScript](https://www.typescriptlang.org/) implementation inspired by Java's `Optional`,
designed as a container object that may or may not contain a non-null value.
It offers methods for handling the value's presence or absence in a more expressive and safer way,
aiming to reduce the chances of null pointer exceptions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the value that may be contained within. |

#### Constructors

##### new OptionalValue()

```ts
protected new OptionalValue<T>(value): OptionalValue<T>
```

Initializes a new instance with the provided value, which can be `null` or `undefined`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The initial value, potentially `null` or `undefined`. to prevent direct instantiation from outside the class. |

###### Returns

[`OptionalValue`](globals.md#optionalvaluet)\<`T`\>

###### Defined in

[index.ts:31](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L31)

#### Methods

##### filter()

```ts
filter<U>(this, predicate): Optional<U>
```

Applies a predicate to the contained value if present,
returning an instance containing the value only if the predicate is satisfied.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `U` | The type of the value that may be contained within. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Optional`](globals.md#optionalt)\<`U`\> | - |
| `predicate` | (`value`) => `boolean` | A predicate function to apply to the contained value. |

###### Returns

[`Optional`](globals.md#optionalt)\<`U`\>

An instance containing the value if the predicate is satisfied;
         otherwise, an instance representing no value.

###### See

[Java Reference: `public Optional<T> filter(Predicate<? super T> predicate)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const filtered: Optional<number> = optional.filter((value) => value > 3);
```

###### Defined in

[index.ts:199](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L199)

##### flatMap()

```ts
flatMap<U, V>(this, mapper): Optional<V>
```

Applies a flat-mapping function to the contained value if present,
returning the direct result of the function without additional wrapping.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `U` | The type of the value that may be contained within. |
| `V` | The type of the value that may be contained within the result of the mapping function. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Optional`](globals.md#optionalt)\<`U`\> | - |
| `mapper` | (`value`) => [`Optional`](globals.md#optionalt)\<`V`\> | A flat-mapping function to apply to the contained value. |

###### Returns

[`Optional`](globals.md#optionalt)\<`V`\>

The result of the mapping function, or an instance representing
         no value if the original instance does not contain a value.

###### See

[Java Reference: `public <U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const flatMapped: Optional<string> = optional.flatMap((value) => Optional(String(value)));
```

###### Defined in

[index.ts:258](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L258)

##### get()

```ts
get(): T
```

Retrieves the contained value.

###### Returns

`T`

The contained value, which may be `null` if no value is present.

###### See

[Java Reference: `public T get()`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const value: number | null = optional.get();
```

###### Defined in

[index.ts:97](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L97)

##### ifEmpty()

```ts
ifEmpty(consumer): this
```

Executes a given function if no value is contained within.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `consumer` | () => `void` | A function to execute if no value is present. |

###### Returns

`this`

###### Example

```ts
optional.ifEmpty(() => console.log("Empty"));
```

###### Defined in

[index.ts:175](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L175)

##### ifPresent()

```ts
ifPresent(consumer): this
```

Executes a given function with the contained value if present; does nothing otherwise.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `consumer` | (`value`) => `void` | A function to execute with the contained value. |

###### Returns

`this`

###### See

[Java Reference: `public void ifPresent(Consumer<? super T> consumer)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
optional.ifPresent((value) => console.log("Present:", value));
```

###### Defined in

[index.ts:137](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L137)

##### isEmpty()

```ts
isEmpty(): this is Empty
```

Determines whether the instance does not contain a value.

###### Returns

`this is Empty`

`true` if no value is present; otherwise, false.

###### Example

```ts
if (optional.isEmpty()) {
  const copy: Optional.Empty = optional;
  const value: null = optional.get();
} else {
  const copy: Optional.Present<number> = optional;
  const value: number = optional.get();
}
```

###### Defined in

[index.ts:161](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L161)

##### isPresent()

```ts
isPresent(): this is Present<T>
```

Checks whether a value is contained within.

###### Returns

`this is Present<T>`

`true` if a value is present; otherwise, `false`.

###### See

[Java Reference: `public boolean isPresent()`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
if (optional.isPresent()) {
  const copy: Optional.Present<number> = optional;
  const value: number = optional.get();
} else {
  const copy: Optional.Empty = optional;
  const value: null = optional.get();
}
```

###### Defined in

[index.ts:120](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L120)

##### map()

```ts
map<U, V>(this, mapper): Optional<V>
```

Applies a mapping function to the contained value if present,
wrapping the result in a new instance if the result is non-null.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `U` | The type of the value that may be contained within. |
| `V` | The type of the value that may be contained within the result of the mapping function. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Optional`](globals.md#optionalt)\<`U`\> | - |
| `mapper` | (`value`) => `V` | A function to apply to the contained value. |

###### Returns

[`Optional`](globals.md#optionalt)\<`V`\>

An instance containing the result of the mapping function if the result is non-null;
         otherwise, an instance representing no value.

###### See

[Java Reference: `public <U> Optional<U> map(Function<? super T,? extends U> mapper)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const mapped: Optional<string> = optional.map((value) => String(value));
```

###### Defined in

[index.ts:228](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L228)

##### orElse()

```ts
orElse<U>(this, other): NonNullable<U>
```

Retrieves the contained value if present; otherwise, returns a specified alternative value.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `U` | The type of the value that may be contained within. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Optional`](globals.md#optionalt)\<`U`\> | - |
| `other` | `NonNullable`\<`U`\> | The alternative value to return if no value is contained. |

###### Returns

`NonNullable`\<`U`\>

The contained value if present; otherwise, the alternative value.

###### See

[Java Reference: `public T orElse(T other)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const orElse: number = optional.orElse(123);
```

###### Defined in

[index.ts:280](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L280)

##### orElseGet()

```ts
orElseGet<U>(this, other): NonNullable<U>
```

Retrieves the contained value if present; otherwise, invokes a supplier function and returns its result.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `U` | The type of the value that may be contained within. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Optional`](globals.md#optionalt)\<`U`\> | - |
| `other` | () => `NonNullable`\<`U`\> | A supplier function providing an alternative value. |

###### Returns

`NonNullable`\<`U`\>

The contained value if present; otherwise, the result of the supplier function.

###### See

[Java Reference: `public T orElseGet(Supplier<? extends T> other)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
const orElseGet: number = optional.orElseGet(() => 123);
```

###### Defined in

[index.ts:302](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L302)

##### orElseThrow()

```ts
orElseThrow<E>(errorSupplier): NonNullable<T>
```

Retrieves the contained value if present; otherwise, throws an error provided by a supplier function.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `E` *extends* `Error` | type of the `Error` to be thrown. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `errorSupplier` | () => `E` | A supplier function that provides the error to be thrown. |

###### Returns

`NonNullable`\<`T`\>

The contained value if present; otherwise, throws the supplied error.

###### See

[Java Reference: `public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X extends Throwable`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Example

```ts
try {
  const value: number = optional.orElseThrow(() => new Error("Value not present"));
} catch (error) {
  console.error(error);
}
```

###### Defined in

[index.ts:329](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L329)

##### empty()

```ts
static empty(): Empty
```

Creates an instance without any contained value.

###### Returns

[`Empty`](namespaces/Optional.md#empty)

An instance representing the absence of any value.

###### Defined in

[index.ts:49](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L49)

##### isPresent()

```ts
static isPresent<T>(value): value is NonNullable<T>
```

Determines whether the provided value is neither `null` nor `undefined`.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the value that may be contained within. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to check. |

###### Returns

`value is NonNullable<T>`

`true` if the value is present; otherwise, `false`.

###### Defined in

[index.ts:40](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L40)

##### of()

```ts
static of<T>(value): Optional<NonNullable<T>>
```

Wraps a given value in an instance if the value is non-null;
otherwise, returns an instance representing no value.

###### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the value that may be contained within. |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The possibly-null value to wrap. |

###### Returns

[`Optional`](globals.md#optionalt)\<`NonNullable`\<`T`\>\>

An instance containing the value if non-null;
         otherwise, an instance representing no value.

###### See

[Java Reference: `public static <T> Optional<T> of(T value)`](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

###### Examples

```ts
const optional: Optional<number> = OptionalValue.of(123);
```

```ts
const optionalString: Optional<string> = OptionalValue.of("123" as string | undefined | null);
const optionalNull: Optional.Empty = OptionalValue.of(null);
const optionalUndefined: Optional.Empty = OptionalValue.of(undefined);
```

###### Defined in

[index.ts:76](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L76)

## Type Aliases

### Optional\<T\>

```ts
type Optional<T>: Empty | Present<T>;
```

A [TypeScript](https://www.typescriptlang.org/) implementation inspired by Java's `Optional`,
designed as a container object that may or may not contain a non-null value.
It offers methods for handling the value's presence or absence in a more expressive and safer way,
aiming to reduce the chances of null pointer exceptions.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Defined in

[index.ts:344](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L344)

## Functions

### Optional()

```ts
function Optional<T>(value): Optional<NonNullable<T>>
```

A [TypeScript](https://www.typescriptlang.org/) implementation inspired by Java's `Optional`,
designed as a container object that may or may not contain a non-null value.
It offers methods for handling the value's presence or absence in a more expressive and safer way,
aiming to reduce the chances of null pointer exceptions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the value that may be contained within. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to evaluate and potentially encapsulate. |

#### Returns

[`Optional`](globals.md#optionalt)\<`NonNullable`\<`T`\>\>

An instance representing either the presence of a non-null value or the absence of a value.

#### Examples

```ts
const optional: Optional<number> = Optional(123);
```

```ts
const optionalString: Optional<string> = Optional("123" as string | undefined | null);
const optionalNull: Optional.Empty = Optional(null);
const optionalUndefined: Optional.Empty = Optional(undefined);
```

#### Defined in

[index.ts:344](https://github.com/lilBunnyRabbit/optional/blob/4899a3f175bd32a691acae49427964fc4113c9e7/src/index.ts#L344)

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [Optional](namespaces/Optional.md) | A [TypeScript](https://www.typescriptlang.org/) implementation inspired by Java's `Optional`, designed as a container object that may or may not contain a non-null value. It offers methods for handling the value's presence or absence in a more expressive and safer way, aiming to reduce the chances of null pointer exceptions. |
