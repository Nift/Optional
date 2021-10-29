# Optional
 
Optional is a maybe (option) type implemented in TypeScript for usage in TypeScript and JavaScript.

There is overall 3 reasons for using the Optional library:

- The Optional type allows you to avoid errors related to `undefined` and `null` values in your code.
- It enforces you to think about what should happen if a given value is `undefined` or `null` in your program flow either avoiding run-time errors or ensuring you control the throwing of errors. 
- You can drastically reduce the amount of `undefined` and `null` checks required.

## Installation

This module is available through the [npm registry](https://www.npmjs.com/package/optional-typescript).

### Yarn

```bash
yarn add optional-typescript
```

### npm

```bash
npm install --save optional-typescript
```

## Features

- Robust and tested
- Self-contained - no external dependencies required
- Written in TypeScript

## Usage

### Creating an optional

You can either use the optional constructor:

```Javascript
    const valueOrNone = new Optional(1)
```

Or the `Some` helper function:

```javascript
    const valueOrNone = Some(1);
```

#### Creating a 'none' Optional

If you are in need of a none value you either use the optional constructor:

```javascript
const valueOrNone = new Optional(undefined);
const valueOrNone = new Optional(null);
```

Or use the `None` function:

```javascript
const valueOrNone = None();
```

### Functions

- `match`
  - Calls the some function if the optional contains a value, otherwise calls the none function. This method allows you to convert the optional to any other type.
- `matchAsync`
  - Async variant of the match function above.
- `equals`
  - Compares two optionals
- `contains`
  - Checks if the given optional contains the specified variable
- `map`
  - Allows the optional to change its underlying value, for instance to a different type.
- `mapAsync`
  - Async variant of the `map` function.
- `flatMap`
  - Allows the optional to change from one optional type to the other. 
- `flatMapAsync`
  - Async variant of `flatMap`.
- `filter`
  - Filters the optional by checking if the optional satifies the given predicate. Returns a None option if the value does not satisfy the given predicate.
- `filterAsync`
  - Async varaitn of filter.
- `valueOr`
  - Returns the stored value or the specified alternative. The alternative can be an alternate value of the same type, a function returning a value of the same type, an error or a function throwing an error.
- `valueOrAsync`
  - Async variant of `valueOr`.
- `valueOrFailure`
  - Returns the stored value or throws an error with an optionally specified error message. Is usually used together with `hasValue` value on the Optional type. `
- `valueOrUndefined`
  - Returns the stored value or undefined
- `valueOrNull`
  - Returns the stored value or null
- `tap`
  - Call a method aside only if a value is given, without any modification on the optional (usually for debuging).
- `toJSON`
  - Return the stored value or null if no value exists. Used with JSON serialization.

### Helper functions

- `Some`
  - Wraps a given value in an optional;
- `None`
  - Generates a None optional type
- `GetValues`
  - Gets the values out of a list of optionals
- `ConvertAndGetValues`
  - First converts a given value from one type, B, to another type, A, and then returns a list of type A.
- `ConvertAndGetValuesAsync`
  - Does the same as `ConvertAndGetValues` but takes an async mapper function instead. 

## Why have async functions separate from 'regular' functions

The reason for this is we believe it makes the types from Typescript easier to reason about and deal with, as instead of having code like the following:

```javascript
const valueOrNone = Some(1);
const value = await (<<Promise<number>> valueOrNone.valueOr(async () => 2));
```

We can instead have code like this:

```javascript
const valueOrNone = Some(1);
const value = await valueOrNone.valueOrAsync(async () => 2);
```

## Contributions

Contributions are welcome.
If you find any issues or have a feature request, please open an issue.

Do not expect 'out of the blue' pull-requests to be accepted if they do not solve a reported issue.

Please ensure that your pull-requests are well-tested and pass all existing tests.

# License 
The MIT License (MIT)

Copyright (c) 2020 Nikolaj Borg-Hass

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

