/**
 * {@link https://www.typescriptlang.org/ TypeScript} implementation of {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html java.util.Optional<T>}.
 *
 * > **Definition**
 * > A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
 * > Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present).
 * >
 * > This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.
 *
 * The main difference is that it doesn't throw errors if the value is not defined and simply just returns `null`.
 *
 * @packageDocumentation
 */

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 *
 * @template T - The type of the value that may be contained within.
 */
export class OptionalValue<T> {
  /**
   * Initializes a new instance with the provided value, which can be `null` or `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The initial value, potentially `null` or `undefined`.
   * @protected to prevent direct instantiation from outside the class.
   */
  protected constructor(private value: T) {}

  /**
   * Determines whether the provided value is neither `null` nor `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The value to check.
   * @returns `true` if the value is present; otherwise, `false`.
   */
  static isPresent<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null;
  }

  /**
   * Creates an instance without any contained value.
   *
   * @returns An instance representing the absence of any value.
   *
   * @example
   * ```ts
   * const optional: Optional.Empty = Optional.empty();
   * ```
   */
  static empty(): Optional.Empty {
    return new OptionalValue(null);
  }

  /**
   * Wraps a given value in an instance if the value is non-null;
   * otherwise, returns an instance representing no value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public static <T> Optional<T> of(T value)`}
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The possibly-null value to wrap.
   * @returns An instance containing the value if non-null;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = OptionalValue.of(123);
   * ```
   *
   * @example
   * ```ts
   * const optionalString: Optional<string> = OptionalValue.of("123" as string | undefined | null);
   * const optionalNull: Optional.Empty = OptionalValue.of(null);
   * const optionalUndefined: Optional.Empty = OptionalValue.of(undefined);
   * ```
   */
  static of<T>(value: T): Optional<NonNullable<T>> {
    if (OptionalValue.isPresent(value)) {
      return new OptionalValue(value);
    }

    return OptionalValue.empty();
  }

  /**
   * Parses an error from the provided message or error supplier.
   *
   * This utility method helps convert a string message or a function that provides an error
   * into an `Error` object. If no supplier or message is provided, it returns a default `Error`
   * with the default message.
   *
   * @template E - The type of the `Error` to be returned.
   * @param messageOrErrorSupplier - A string message or a function that supplies an `Error` instance.
   * @returns An `Error` instance constructed from the provided message or supplier, or a default error.
   */
  private parseError<E extends Error>(messageOrErrorSupplier?: string | (() => E)) {
    if (!messageOrErrorSupplier) {
      return new Error("Value not present.");
    }

    if (typeof messageOrErrorSupplier === "string") {
      return new Error(messageOrErrorSupplier);
    }

    return messageOrErrorSupplier();
  }

  /**
   * Retrieves the contained value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T get()`}
   *
   * @template T - The type of the value that may be contained within.
   * @returns The contained value, which may be `null` if no value is present.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const value: number | null = optional.get();
   * ```
   */
  public get(): T {
    return this.value;
  }

  /**
   * Checks whether a value is contained within.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public boolean isPresent()`}
   *
   * @template T - The type of the value contained within the instance.
   * @returns `true` if a value is present; otherwise, `false`.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * if (optional.isPresent()) {
   *   const copy: Optional.Present<number> = optional;
   *   const value: number = optional.get();
   * } else {
   *   const copy: Optional.Empty = optional;
   *   const value: null = optional.get();
   * }
   * ```
   */
  public isPresent(): this is Optional.Present<T> {
    return OptionalValue.isPresent(this.value);
  }

  /**
   * Executes a given function with the contained value if present; does nothing otherwise.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public void ifPresent(Consumer<? super T> consumer)`}
   *
   * @template T - The type of the value that may be contained within.
   * @param consumer - A function to execute with the contained value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * optional.ifPresent((value) => console.log("Present:", value));
   * ```
   */
  public ifPresent(consumer: (value: NonNullable<T>) => void): this {
    if (this.isPresent()) {
      consumer(this.value);
    }

    return this;
  }

  /**
   * Determines whether the instance does not contain a value.
   *
   * @returns `true` if no value is present; otherwise, false.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * if (optional.isEmpty()) {
   *   const copy: Optional.Empty = optional;
   *   const value: null = optional.get();
   * } else {
   *   const copy: Optional.Present<number> = optional;
   *   const value: number = optional.get();
   * }
   * ```
   */
  public isEmpty(): this is Optional.Empty {
    return !OptionalValue.isPresent(this.value);
  }

  /**
   * Executes a given function if no value is contained within.
   *
   * @param consumer - A function to execute if no value is present.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * optional.ifEmpty(() => console.log("Empty"));
   * ```
   */
  public ifEmpty(consumer: () => void): this {
    if (this.isEmpty()) {
      consumer();
    }

    return this;
  }

  /**
   * Applies a predicate to the contained value if present,
   * returning an instance containing the value only if the predicate is satisfied.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public Optional<T> filter(Predicate<? super T> predicate)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param predicate - A predicate function to apply to the contained value.
   * @returns An instance containing the value if the predicate is satisfied;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const filtered: Optional<number> = optional.filter((value) => value > 3);
   * ```
   */
  public filter<U>(this: Optional<U>, predicate: (value: NonNullable<U>) => boolean): Optional<U> {
    if (this.isEmpty()) {
      return this;
    }

    if (predicate(this.value)) {
      return this;
    }

    return OptionalValue.empty();
  }

  /**
   * Applies a mapping function to the contained value if present,
   * wrapping the result in a new instance if the result is non-null.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <U> Optional<U> map(Function<? super T,? extends U> mapper)`}
   *
   * @template U - The type of the value that may be contained within.
   * @template V - The type of the value that may be contained within the result of the mapping function.
   * @param mapper - A function to apply to the contained value.
   * @returns An instance containing the result of the mapping function if the result is non-null;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const mapped: Optional<string> = optional.map((value) => String(value));
   * ```
   */
  public map<U, V>(this: Optional<U>, mapper: (value: NonNullable<U>) => V): Optional<V> {
    if (this.isEmpty()) {
      return this;
    }

    const mapped = mapper(this.value);
    if (OptionalValue.isPresent(mapped)) {
      return OptionalValue.of(mapped);
    }

    return OptionalValue.empty();
  }

  /**
   * Applies a flat-mapping function to the contained value if present,
   * returning the direct result of the function without additional wrapping.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper)`}
   *
   * @template U - The type of the value that may be contained within.
   * @template V - The type of the value that may be contained within the result of the mapping function.
   * @param mapper - A flat-mapping function to apply to the contained value.
   * @returns The result of the mapping function, or an instance representing
   *          no value if the original instance does not contain a value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const flatMapped: Optional<string> = optional.flatMap((value) => Optional(String(value)));
   * ```
   */
  public flatMap<U, V>(this: Optional<U>, mapper: (value: NonNullable<U>) => Optional<V>): Optional<V> {
    if (this.isEmpty()) {
      return this;
    }

    return mapper(this.value);
  }

  /**
   * Retrieves the contained value if present; otherwise, returns a specified alternative value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T orElse(T other)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param other - The alternative value to return if no value is contained.
   * @returns The contained value if present; otherwise, the alternative value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const orElse: number = optional.orElse(456);
   * ```
   */
  public orElse<U>(this: Optional<U>, other: NonNullable<U>): NonNullable<U> {
    if (this.isPresent()) {
      return this.value;
    }

    return other;
  }

  /**
   * Retrieves the contained value if present; otherwise, invokes a supplier function and returns its result.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T orElseGet(Supplier<? extends T> other)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param other - A supplier function providing an alternative value.
   * @returns The contained value if present; otherwise, the result of the supplier function.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const orElseGet: number = optional.orElseGet(() => 456);
   * ```
   */
  public orElseGet<U>(this: Optional<U>, other: () => NonNullable<U>): NonNullable<U> {
    if (this.isPresent()) {
      return this.value;
    }

    return other();
  }

  /**
   * Retrieves the contained value if present; otherwise, throws an error provided by a supplier or a message.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X extends Throwable`}
   *
   * @template T - The type of the value contained within the instance.
   * @template E - type of the `Error` to be thrown.
   * @param messageOrErrorSupplier - A string message or a supplier function that provides the error to be thrown.
   * @returns The contained value if present; otherwise, throws the supplied error.
   * @throws An error if the value is not present.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * try {
   *   const value: number = optional.orElseThrow();
   * } catch (error) {
   *   console.error(error); // Error: Value not present.
   * }
   * ```
   */
  public orElseThrow<E extends Error>(messageOrErrorSupplier?: string | (() => E)): NonNullable<T> {
    if (this.isPresent()) {
      return this.value;
    }

    throw this.parseError(messageOrErrorSupplier);
  }

  /**
   * Checks whether this instance is equal to another, optionally using a custom comparator.
   *
   * @template U - The type of the value contained within the current instance.
   * @template V - The type of the value contained within the other instance.
   * @param other - The other instance to compare.
   * @param comparator - An optional function to compare the values.
   * @returns `true` if both instances are equal; otherwise, `false`.
   *
   * @example
   * ```ts
   * const optional1: Optional<number> = Optional(123);
   * const optioanl2: Optional<number> = Optional(123);
   *
   * if (optional1.equals(optioanl2)) {
   *   const copy: Optional<number> = optional1;
   *   const value: number | null = optional1.get();
   * }
   * ```
   */
  public equals<U, const V extends U>(
    this: Optional<U>,
    other: Optional<V>,
    comparator?: (a: U, b: U) => boolean
  ): this is Optional<V> {
    if (this.isEmpty() && other.isEmpty()) {
      return true;
    }

    if (this.isEmpty() || other.isEmpty()) {
      return false;
    }

    if (comparator) {
      return comparator(this.value, other.value);
    }

    return this.value === other.value;
  }

  /**
   * Checks if the contained value matches the provided value.
   *
   * @template U - The type of the value contained within the current instance.
   * @template V - The type of the value to check for equality.
   * @param value - The value to compare against.
   * @returns `true` if the contained value matches the provided value; otherwise, `false`.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * if (optional.contains(123)) {
   *   const copy: Optional.Present<123> = optional;
   *   const value: 123 = optional.get();
   * }
   * ```
   */
  public contains<U, const V extends U>(this: Optional<U>, value: V): this is Optional.Present<V> {
    return this.isPresent() && this.value === value;
  }

  /**
   * Converts the instance to a `Promise`.
   *
   * @param messageOrErrorSupplier - A string message or a supplier function that provides the error if the value is empty.
   * @returns A `Promise` that resolves with the contained value or rejects with the error.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = Optional(123);
   * const promise: Promise<number> = optional.toPromise();
   * ```
   */
  public toPromise<E extends Error>(messageOrErrorSupplier?: string | (() => E)): Promise<NonNullable<T>> {
    return this.isPresent() ? Promise.resolve(this.value) : Promise.reject(this.parseError(messageOrErrorSupplier));
  }

  /**
   * Converts the instance to a string representation.
   *
   * @returns A string representing the contained value or empty.
   *
   * @example
   * ```ts
   * const optional1 = Optional(123);
   * console.log(optional1.toString()); // "Optional.Present<123>"
   *
   * const optional2 = OptionalValue.empty();
   * console.log(optional2.toString()); // "Optional.Empty"
   * ```
   */
  public toString() {
    if (this.isPresent()) {
      const value = this.value;

      if (typeof value === "object" || typeof value === "string") {
        try {
          return `Optional.Present<${JSON.stringify(value)}>`;
        } catch {
          return `Optional.Present<${value}>`;
        }
      }

      return `Optional.Present<${value}>`;
    }

    return "Optional.Empty";
  }
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 */
export namespace Optional {
  /**
   * Represents the type for an instance that does not contain any value.
   * This type is used to signify the absence of a value explicitly.
   */
  export type Empty = OptionalValue<null>;

  /**
   * Represents the type for an instance that contains a non-null value.
   * This type is used to handle cases where a value is definitely present.
   *
   * @template T - The type of the value contained within the instance.
   */
  export type Present<T> = OptionalValue<NonNullable<T>>;
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 */
export type Optional<T> = Optional.Empty | Optional.Present<T>;

/**
 * Defines a function that works with the concept of optionality,
 * either returning an instance encapsulating a value,
 * if non-null, or an instance signifying the absence of a value.
 */
interface OptionalFunction {
  /**
   * Creates an instance encapsulating the given value if it is non-null.
   * If the value is null, it returns an instance signifying the absence of any value.
   * This allows for the safe handling of values that might be `null` or `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The value to evaluate and potentially encapsulate.
   * @returns An instance representing either the presence of a non-null value or the absence of a value.
   */
  <T>(value: T): Optional<NonNullable<T>>;

  /**
   * Creates an instance that signifies the absence of any value.
   * This is used to represent cases where a value is explicitly known to be absent or unavailable.
   *
   * @returns An instance representing the absence of a value.
   */
  empty(): Optional.Empty;
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 *
 * @example
 * ```ts
 * const optional: Optional<number> = Optional(123);
 * ```
 *
 * @example
 * ```ts
 * const optionalString: Optional<string> = Optional("123" as string | undefined | null);
 * const optionalNull: Optional.Empty = Optional(null);
 * const optionalUndefined: Optional.Empty = Optional(undefined);
 * ```
 */
export const Optional = OptionalValue.of as OptionalFunction;

Optional.empty = OptionalValue.empty;
