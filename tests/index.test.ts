import { Optional, OptionalValue } from "../src";

describe("optional", () => {
  test("Optional(value)", () => {
    const optional: Optional<number> = Optional(123);
    expect(optional).toBeInstanceOf(OptionalValue);

    const nullOptional: Optional.Empty = Optional(null);
    expect(nullOptional).toBeInstanceOf(OptionalValue);

    const undefinedOptional: Optional.Empty = Optional(undefined);
    expect(undefinedOptional).toBeInstanceOf(OptionalValue);
  });

  test("Optional.empty()", () => {
    const optional = Optional.empty();
    expect(optional).toBeInstanceOf(OptionalValue);
  });

  test("Optional.get()", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);
    expect(optional.get()).toEqual(value);

    const nullOptional: Optional.Empty = Optional(null);
    expect(nullOptional.get()).toEqual(null);

    const undefinedOptional: Optional.Empty = Optional(undefined);
    expect(undefinedOptional.get()).toEqual(null);

    const emptyOptional = Optional.empty();
    expect(emptyOptional.get()).toEqual(null);
  });

  test("Optional.isPresent()", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    expect(optional.isPresent()).toBe(true);
    expect(optional.get()).toBe(value);

    const emptyOptional = Optional.empty();
    expect(emptyOptional.isPresent()).toBe(false);
    expect(emptyOptional.get()).toBe(null);
  });

  test("Optional.ifPresent(consumer)", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    let output = false;
    optional.ifPresent(() => (output = true));
    expect(output).toBe(true);

    const emptyOptional = Optional.empty();

    let emptyOutput = false;
    emptyOptional.ifPresent(() => (emptyOutput = true));
    expect(emptyOutput).toBe(false);
  });

  test("Optional.isEmpty()", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    expect(optional.isEmpty()).toBe(false);
    expect(optional.get()).toBe(value);

    const emptyOptional = Optional.empty();
    expect(emptyOptional.isEmpty()).toBe(true);
    expect(emptyOptional.get()).toBe(null);
  });

  test("Optional.ifEmpty(consumer)", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    let output = false;
    optional.ifEmpty(() => (output = true));
    expect(output).toBe(false);

    const emptyOptional = Optional.empty();

    let emptyOutput = false;
    emptyOptional.ifEmpty(() => (emptyOutput = true));
    expect(emptyOutput).toBe(true);
  });

  test("Optional.filter(predicate)", () => {
    const value = 1;

    const optional: Optional<number> = Optional(value);

    const trueFiltered = optional.filter((value) => value > 0);
    expect(trueFiltered).toBeInstanceOf(OptionalValue);
    expect(trueFiltered.get()).toBe(value);

    const falseFiltered = optional.filter((value) => value < 0);
    expect(falseFiltered).toBeInstanceOf(OptionalValue);
    expect(falseFiltered.isEmpty()).toBe(true);

    const emptyOptional = Optional.empty();

    const emptyTrueFiltered = emptyOptional.filter(() => true);
    expect(emptyTrueFiltered).toBeInstanceOf(OptionalValue);
    expect(emptyTrueFiltered.isEmpty()).toBe(true);

    const emptyFalseFiltered = emptyOptional.filter(() => false);
    expect(emptyFalseFiltered).toBeInstanceOf(OptionalValue);
    expect(emptyFalseFiltered.isEmpty()).toBe(true);
  });

  test("Optional.map(mapper)", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    const mapped = optional.map((value) => String(value));
    expect(mapped).toBeInstanceOf(OptionalValue);
    expect(mapped.get()).toBe(String(value));

    const emptyOptional = Optional.empty();

    const emptyMapped = emptyOptional.map((value) => String(value));
    expect(emptyMapped).toBeInstanceOf(OptionalValue);
    expect(emptyMapped.isEmpty()).toBe(true);
  });

  test("Optional.flatMap(mapper)", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);

    const flatMapped = optional.flatMap((value) => Optional(String(value)));
    expect(flatMapped).toBeInstanceOf(OptionalValue);
    expect(flatMapped.get()).toBe(String(value));

    const emptyOptional = Optional.empty();

    const emptyFlatMapped = emptyOptional.flatMap((value) => Optional(String(value)));
    expect(emptyFlatMapped).toBeInstanceOf(OptionalValue);
    expect(emptyFlatMapped.isEmpty()).toBe(true);
  });

  test("Optional.orElse(other)", () => {
    const value = 123;
    const other = 456;

    const optional: Optional<number> = Optional(value);

    const orElse = optional.orElse(other);
    expect(orElse).toEqual(value);

    const emptyOptional = Optional.empty();

    const emptyOrElse = emptyOptional.orElse(other);
    expect(emptyOrElse).toEqual(other);
  });

  test("Optional.orElseGet(other)", () => {
    const value = 123;
    const other = 456;

    const optional: Optional<number> = Optional(value);

    const orElseGet = optional.orElseGet(() => other);
    expect(orElseGet).toEqual(value);

    const emptyOptional = Optional.empty();

    const emptyOrElseGet = emptyOptional.orElseGet(() => other);
    expect(emptyOrElseGet).toEqual(other);
  });

  test("Optional.orElseThrow(messageOrErrorSupplier)", () => {
    const optional: Optional<number> = Optional(123);
    const testOptional = () => optional.orElseThrow();

    expect(testOptional).not.toThrow(Error);
    expect(testOptional).not.toThrow("Value not present.");

    const emptyOptional = Optional.empty();
    const testEmptyOptional = () => emptyOptional.orElseThrow();

    expect(testEmptyOptional).toThrow(Error);
    expect(testEmptyOptional).toThrow("Value not present.");

    const emptyOptional2 = Optional.empty();
    const testEmptyOptional2 = () => emptyOptional2.orElseThrow("No value.");

    expect(testEmptyOptional2).toThrow(Error);
    expect(testEmptyOptional2).toThrow("No value.");

    const emptyOptional3 = Optional.empty();
    const testEmptyOptional3 = () => emptyOptional3.orElseThrow(() => TypeError("Expected type."));

    expect(testEmptyOptional3).toThrow(TypeError);
    expect(testEmptyOptional3).toThrow("Expected type.");
  });

  test("Optional.equals(other)", () => {
    const value = 123;

    const optional1: Optional<number> = Optional(value);
    const optional2: Optional<number> = Optional(value);

    expect(optional1.equals(optional2)).toBe(true);
    expect(optional2.equals(optional1)).toBe(true);

    const optional3: Optional<number> = Optional(456);

    expect(optional1.equals(optional3)).toBe(false);
    expect(optional1.equals(optional3, (a, b) => typeof a === typeof b)).toBe(true);

    const emptyOptional1 = Optional.empty();
    const emptyOptional2 = Optional.empty();

    expect(emptyOptional1.equals(emptyOptional2)).toBe(true);
    expect(optional1.equals(emptyOptional1)).toBe(false);
    expect((emptyOptional1 as Optional<unknown>).equals(optional1)).toBe(false);
  });

  test("Optional.contains(value)", () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);
    const emptyOptional = Optional.empty();

    expect(optional.contains(value)).toBe(true);
    expect(optional.contains(456)).toBe(false);

    expect(emptyOptional.contains(null)).toBe(false);
  });

  test("Optional.toPromise(messageOrErrorSupplier)", async () => {
    const value = 123;

    const optional: Optional<number> = Optional(value);
    const emptyOptional = Optional.empty();

    const promise = optional.toPromise();
    await expect(promise).resolves.toBe(value);

    const emptyPromise = emptyOptional.toPromise();
    await expect(emptyPromise).rejects.toThrow(Error);
    await expect(emptyPromise).rejects.toThrow("Value not present.");

    const emptyPromise2 = emptyOptional.toPromise("No value.");
    await expect(emptyPromise2).rejects.toThrow(Error);
    await expect(emptyPromise2).rejects.toThrow("No value.");

    const emptyPromise3 = emptyOptional.toPromise(() => TypeError("Expected type."));
    await expect(emptyPromise3).rejects.toThrow(TypeError);
    await expect(emptyPromise3).rejects.toThrow("Expected type.");
  });

  test("Optional.toString()", () => {
    const optional1: Optional<number> = Optional(123);
    expect(optional1.toString()).toBe("Optional.Present<123>");

    const optional2: Optional<string> = Optional("123");
    expect(optional2.toString()).toBe('Optional.Present<"123">');

    const emptyOptional = Optional.empty();
    expect(emptyOptional.toString()).toBe("Optional.Empty");
  });
});
