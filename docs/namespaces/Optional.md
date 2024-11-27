[@lilbunnyrabbit/optional](../globals.md) / Optional

# Optional

A [TypeScript](https://www.typescriptlang.org/) implementation inspired by Java's `Optional`,
designed as a container object that may or may not contain a non-null value.
It offers methods for handling the value's presence or absence in a more expressive and safer way,
aiming to reduce the chances of null pointer exceptions.

## Type Aliases

### Empty

```ts
type Empty: OptionalValue<null>;
```

Represents the type for an instance that does not contain any value.
This type is used to signify the absence of a value explicitly.

#### Defined in

[index.ts:349](https://github.com/lilBunnyRabbit/optional/blob/7e3bbb06d4530d8968d5e23812ee0ede3e9b67a5/src/index.ts#L349)

***

### Present\<T\>

```ts
type Present<T>: OptionalValue<NonNullable<T>>;
```

Represents the type for an instance that contains a non-null value.
This type is used to handle cases where a value is definitely present.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the value contained within the instance. |

#### Defined in

[index.ts:357](https://github.com/lilBunnyRabbit/optional/blob/7e3bbb06d4530d8968d5e23812ee0ede3e9b67a5/src/index.ts#L357)
