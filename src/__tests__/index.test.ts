import {
    Optional,
    Some,
    None,
    GetValues,
    ConvertAndGetValues,
    ConvertAndGetValuesAsync,
    FirstOrNone,
    LastOrNone
} from "../index";

test("should return the some function (match)", () => {
    const valueOrNone = new Optional("test");
    expect(
        valueOrNone.match(
            x => {
                return x + " tester";
            },
            () => "tester"
        )
    ).toBe("test tester");
});

test("should return the none function (match)", () => {
    const valueOrNone = new Optional(undefined);
    expect(
        valueOrNone.match(
            x => {
                return x + " tester";
            },
            () => "tester"
        )
    ).toBe("tester");
});

test("should return the some function (matchAsync)", () => {
    const valueOrNone = new Optional("test");
    valueOrNone
        .matchAsync(
            async x => {
                return x + " tester";
            },
            async () => "tester"
        )
        .then(data => expect(data).toBe("test tester"));
});

test("should return the none function (matchAsync)", () => {
    const valueOrNone = new Optional(undefined);
    valueOrNone
        .matchAsync(
            async x => {
                return x + " tester";
            },
            async () => "tester"
        )
        .then(data => expect(data).toBe("tester"));
});

test("should return true (equals)", () => {
    const valueOrNone = new Optional(1);
    const otherOrNone = new Optional(1);
    expect(valueOrNone.equals(otherOrNone)).toBe(true);
});

test("should return false (equals)", () => {
    const valueOrNone = new Optional(1);
    const otherOrNone = new Optional(2);
    expect(valueOrNone.equals(otherOrNone)).toBe(false);
});

test("should return true (contains)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.contains(1)).toBe(true);
});

test("should return false (contains)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.contains(2)).toBe(false);
});

test("should return true (contains)", () => {
    const valueOrNone = new Optional("1");
    expect(valueOrNone.contains("1")).toBe(true);
});

test("should return false (contains)", () => {
    const valueOrNone = new Optional("1");
    expect(valueOrNone.contains("2")).toBe(false);
});

test("should map the value (map)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.map(a => a * 2).valueOrFailure()).toBe(2);
});

test("should be mapped to different type (map)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.map(a => (a * 2).toString()).valueOrFailure()).toBe("2");
});

test("should be able to map a None optional (map)", () => {
    const valueOrNone = new Optional<number>(undefined);
    expect(valueOrNone.hasValue).toBe(false);
    const mappedOrNone = valueOrNone.map(a => a * 2);
    expect(mappedOrNone.hasValue).toBe(false);
});

test("should map the value (mapAsync)", () => {
    const valueOrNone = new Optional(1);
    valueOrNone
        .mapAsync(async a => a * 2)
        .then(mappedValue => expect(mappedValue.valueOrFailure()).toBe(2));
});

test("should be mapped to different type (mapAsync)", () => {
    const valueOrNone = new Optional(1);
    valueOrNone
        .mapAsync(async a => (a * 2).toString())
        .then(mappedValue => expect(mappedValue.valueOrFailure()).toBe("2"));
});

test("should be able to map a None optional (mapAsync)", () => {
    const valueOrNone = new Optional<number>(undefined);
    expect(valueOrNone.hasValue).toBe(false);
    valueOrNone
        .mapAsync(async a => a * 2)
        .then(mappedOrNone => expect(mappedOrNone.hasValue).toBe(false));
});

test("should flatmap the value to another optional (flatMap)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.flatMap(a => Some(a * 2)).valueOrFailure()).toBe(2);
});

test("should be flatmapped to different type (flatMap)", () => {
    const valueOrNone = new Optional(1);
    expect(
        valueOrNone.flatMap(a => Some((a * 2).toString())).valueOrFailure()
    ).toBe("2");
});

test("should be able to flatmap a None optional (flatMap)", () => {
    const valueOrNone = new Optional<number>(undefined);
    expect(valueOrNone.hasValue).toBe(false);
    const mappedOrNone = valueOrNone.flatMap(a => Some(a * 2));
    expect(mappedOrNone.hasValue).toBe(false);
});

test("should flatmap the value (flatMapAsync)", () => {
    const valueOrNone = new Optional(1);
    valueOrNone
        .flatMapAsync(async a => Some(a * 2))
        .then(mappedValue => expect(mappedValue.valueOrFailure()).toBe(2));
});

test("should be flatmapped to different type (flatMapAsync)", () => {
    const valueOrNone = new Optional(1);
    valueOrNone
        .flatMapAsync(async a => Some((a * 2).toString()))
        .then(mappedValue => expect(mappedValue.valueOrFailure()).toBe("2"));
});

test("should be able to flatmap a None optional (flatMapAsync)", () => {
    const valueOrNone = new Optional<number>(undefined);
    expect(valueOrNone.hasValue).toBe(false);
    valueOrNone
        .flatMapAsync(async a => Some(a * 2))
        .then(mappedOrNone => expect(mappedOrNone.hasValue).toBe(false));
});

test("should return the value (valueOrFailure)", () => {
    const valueOrNone = new Optional("test");
    expect(valueOrNone.valueOrFailure()).toBe("test");
});

test("should fail with an error (valueOrFailure)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() => {
        valueOrNone.valueOrFailure();
    }).toThrowError("There exists no value");
});

test("should fail with specified error message (valueOrFailure)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() => {
        valueOrNone.valueOrFailure("custom message");
    }).toThrowError("custom message");
});

test("should return the value (valueOr)", () => {
    const valueOrNone = new Optional("test");
    expect(valueOrNone.valueOr("Different")).toBe("test");
});

test("should return alternative value (valueOr)", () => {
    const valueOrNone = new Optional<string>(undefined);
    expect(valueOrNone.valueOr("different")).toBe("different");
});

test("should return error (valueOr)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() => {
        valueOrNone.valueOr(new Error("test"));
    }).toThrowError("test");
});

test("should return error function (valueOr)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() =>
        valueOrNone.valueOr(() => {
            throw new Error("test");
        })
    ).toThrowError("test");
});

test("should return the value (valueOrAsync)", () => {
    const valueOrNone = new Optional("test");
    valueOrNone
        .valueOrAsync(new Promise(resolve => resolve("Different")))
        .then(val => expect(val).toBe("test"));
});

test("should return alternative value (valueOrAsync)", () => {
    const valueOrNone = new Optional<string>(undefined);
    valueOrNone
        .valueOrAsync(new Promise(resolve => resolve("different")))
        .then(val => expect(val).toBe("different"));
});

test("should return error (valueOrAsync)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() => {
        valueOrNone.valueOrAsync(new Error("test"));
    }).toThrowError("test");
});

test("should return error function (valueOrAsync)", () => {
    const valueOrNone = new Optional(undefined);
    expect(() =>
        valueOrNone.valueOrAsync(() => {
            throw new Error("test");
        })
    ).toThrowError("test");
});

test("should return value  (valueOrUndefined)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.valueOrUndefined()).toBe(1);
});

test("should return undefined  (valueOrUndefined)", () => {
    const valueOrNone = new Optional(undefined);
    expect(valueOrNone.valueOrUndefined()).toBe(undefined);
});

test("should return value  (valueOrNull)", () => {
    const valueOrNone = new Optional(1);
    expect(valueOrNone.valueOrNull()).toBe(1);
});

test("should return undefined  (valueOrNull)", () => {
    const valueOrNone = new Optional(null);
    expect(valueOrNone.valueOrNull()).toBe(null);
});

test("should convert simple objects to JSON", () => {
    const stringOrNone = new Optional("Hello");
    expect(JSON.stringify(stringOrNone)).toBe(JSON.stringify("Hello"));
});

test("should convert advanced objects to JSON", () => {
    const advancedObject = {
        name: "Hello",
        age: 10,
        func: () => {
            console.log("test");
        }
    };
    const advancedObjectOrNone = new Optional(advancedObject);
    expect(JSON.stringify(advancedObjectOrNone)).toBe(
        JSON.stringify(advancedObject)
    );
});

test("should return an optional", () => {
    const some = Some(1);
    const optional = new Optional(1);
    expect(some).toEqual(optional);
});

test("should return None optional", () => {
    const none = None<string>();
    const optional = new Optional<string>(undefined);
    expect(none).toEqual(optional);
});

test("should retrieve values (GetValues)", () => {
    const optionalList = [Some(1), Some(2), Some(3)];
    const list = GetValues(optionalList);
    expect(list).toEqual([1, 2, 3]);
});

test("should handle empty list (GetValues)", () => {
    const optionalList: Optional<number>[] = [];
    const list = GetValues(optionalList);
    expect(list).toEqual([]);
});

test("should convert and return a list (ConvertAndGetValues)", () => {
    const optionalList = [1, 2, 3];
    const list = ConvertAndGetValues(optionalList, val => val.map(a => a + ""));
    expect(list).toEqual(["1", "2", "3"]);
});

test("should convert and return a list (ConvertAndGetValuesAsync)", () => {
    const optionalList = [1, 2, 3];
    ConvertAndGetValuesAsync(optionalList, async val =>
        val.map(a => a + "")
    ).then(list => expect(list).toEqual(["1", "2", "3"]));
});

test("it should filter the optional (filter)", () => {
    const valueOrNone = Some(1);
    const filteredValue = valueOrNone.filter(x => x === 1);
    expect(filteredValue.hasValue).toBe(true);
});

test("it should filter the optional to none (filter)", () => {
    const valueOrNone = Some(1);
    const filteredValue = valueOrNone.filter(x => x === 2);
    expect(filteredValue.hasValue).toBe(false);
});

test("it should filter the optional (filterAsync)", () => {
    const valueOrNone = Some(1);
    const filteredValue = valueOrNone.filterAsync(async x => x === 1);
    filteredValue.then(val => expect(val.hasValue).toBe(true));
});

test("it should filter the optional to none (filterAsync)", () => {
    const valueOrNone = Some(1);
    const filteredValue = valueOrNone.filterAsync(async x => x === 2);
    filteredValue.then(val => expect(val.hasValue).toBe(false));
});

test("it should retrieve the first element of the array as an optional", () => {
    const arr = [1, 2, 3];
    const firstOrNone = FirstOrNone(arr);
    expect(firstOrNone).toEqual(Some(arr[0]));
    expect(arr).toEqual([1, 2, 3]);
});

test("it should retrieve the last element of the array as an optional", () => {
    const arr = [1, 2, 3];
    const lastOrNone = LastOrNone(arr);
    expect(lastOrNone).toEqual(Some(arr[arr.length - 1]));
    expect(arr).toEqual([1, 2, 3]);
});

test("it should convert the value if none is present", () => {
    const valueOrNone = None();
    expect(valueOrNone.hasValue).toBe(false);
    const convertedValueOrNone = valueOrNone.ifNone(() => 1);
    expect(convertedValueOrNone.hasValue).toBe(true);
    expect(convertedValueOrNone.valueOrFailure()).toBe(1);
});

test("it should not convert the value if one is present", () => {
    const valueOrNone = Some(1);
    expect(valueOrNone.hasValue).toBe(true);
    expect(valueOrNone.valueOrFailure()).toBe(1);
    const newValueOrNone = valueOrNone.ifNone(() => 2);
    expect(newValueOrNone.valueOrFailure()).toBe(1);
});

test("it should be possible to just give value", () => {
    const valueOrNone = None();
    expect(valueOrNone.hasValue).toBe(false);
    const convertedValueOrNone = valueOrNone.ifNone(1);
    expect(convertedValueOrNone.hasValue).toBe(true);
    expect(convertedValueOrNone.valueOrFailure()).toBe(1);
});

test('it should be possible to use call back if value is present', () => {
    const value = Some<number>(1);
    value.ifPresent((value) => {
        expect(value).toEqual(1);
    })
})

