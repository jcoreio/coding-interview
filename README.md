# Coding Interview - JSON Schema Validation

Your goal in this interview is to implement a few fundamental parts of
JSON Schema validation.

## Getting started

Run the following:

```sh
git clone https://github.com/jcoreio/coding-interview.git
cd coding-interview
npm install
```

Then open `coding-interview` in your editor.

The repo contains a stub `validate` function in [`src/index.ts`](src/index.ts)
and stub Mocha tests in [`test/index.ts`](test/index.ts).

You can run the tests in watch mode with `npm test`.

# JSON Schema overview

Here are some example JSON schemas:

```json
{ "type": "number" }
```

```json
{
  "type": "object",
  "properties": {
    "foo": { "type": "array" },
    "bar": { "type": "number" }
  },
  "required": ["foo"]
}
```

Each property of the schema is a check that is performed independently.
Some checks are only applied if relevant to the input type, for example,
`"properties"` and `"required"` have no effect if the input is not an object.
And the keys in `"required"` are checked regardless of whether they are present
in `"properties"` (or if `"properties"` is even specified in the schema).

The input is valid unless at least one of the checks fails (meaning the schema `{}`
accepts any input).

# Part 1 - basic type validation

Add implementation and tests for valiating `"type": "string"`, `"type": "number"`,
`"type": "boolean"`, `"type": "object"`, and `"type": "array"` in the JSON schema.

The `validate` function should return `true` if the `input` is valid according to
the `schema`, and `false` if invalid. For example:

```ts
// true (valid) cases:
validate("a", { type: "string" }); // returns true
validate(2, { type: "number" }); // returns true
validate([], { type: "array" }); // returns true
validate({}, { type: "object" }); // returns true

// false (invalid) cases:
validate(2, { type: "string" }); // returns false
validate([], { type: "object" }); // returns false
```

# Part 2 - array item validation

Add implementation and tests for validating `"items": <subschema>`. That is,
if the input is an array and the schema has an `"items"` property, validate
each item of the input array against the `"items"` subschema. For example:

```ts
// true (valid) cases:
validate([1, 2, 3], { items: { type: "number" } }); // returns true
validate("a", { items: "number" }); // returns true
validate([[1], [2, 3]], { items: { items: { type: "number" } } }); // returns true

// false (invalid) cases
validate([1, 2, "a"], { items: { type: "number" } }); // returns false
validate([[1], [2, 3], 4], { items: { items: { type: "number" } } }); // returns false
```

# Part 3 - object property validation

Add implementation and tests for validating `"properties"`. That is, if the
input is an object and the schema has a `"properties"` property, validate
the property values of the input against the corresponding subschemas in`"properties"`
(ignore any keys that are not in both the input and`"properties"`). For example:

```ts
// true (valid) cases
validate(
  { a: 1 },
  { properties: { a: { type: "number" }, b: { type: "string" } } },
); // returns true
validate(
  { a: 1, b: "3" },
  { properties: { a: { type: "number" }, b: { type: "string" } } },
); // returns true
validate(
  { a: 1, b: [1, 2, 3] },
  { properties: { a: { type: "number" }, b: { items: { type: "number" } } } },
); // returns true
validate(
  { a: { b: 2 }, c: "hello" },
  { properties: { a: { properties: { b: { type: "number" } } } } },
); // returns true
validate(2, { properties: { a: { type: "number" } } }); // returns true

// false (invalid) cases
validate({ a: "1" }, { properties: { a: { type: "number" } } }); // returns false
validate(
  { a: 1, b: [1, 2, "3"] },
  { properties: { a: { type: "number" }, b: { items: { type: "number" } } } },
); // returns false
validate(
  { a: { c: 2 } },
  { properties: { a: { properties: { c: { type: "string" } } } } },
); // returns false
```

# Part 4 - required property validation

Add implementation and tests for validating `"required"`. That is, if the
input is an object and the schema has a `"required"`property, validate
that the input object contains all of the property keys in `"required"`.
For example:

```ts
// true (valid) cases
validate({ a: 1, b: 2 }, { required: ["a", "b"] }); // returns true
validate({ a: 1, b: 2, c: 3 }, { required: ["a", "b"] }); // returns true
validate(2, { required: ["a", "b"] }); // returns true

// false (invalid) cases
validate({ a: 1 }, { required: ["a", "b"] }); // returns false
```

# Bonus Part 5 - detailed errors

Let's say you want more detailed information about why validation failed instead of
just `true` or `false`.
Describe how would you refactor `validate` to output or throw more information about this.
If you have time you're welcome to code it up!

# Bonus Part 6 - magic TS types

Let's say you want to declare JSON schemas in TypeScript. Can you implement TS conditional
types to determine the type of a valid value for a given schema? Some things about JSON
schema make this tricky, can you think what that would be?

For example:

```ts
type Schema = { ... }
type ValidValue<S extends Schema> =
  S['type'] extends 'number' ? number
  : S['type'] extends 'string' ? string
  : ...

type A = ValidValue<{ type: 'array', items: { type: "number" }}> // number[]
```
