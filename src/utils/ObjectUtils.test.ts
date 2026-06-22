import ObjectUtils from "./ObjectUtils";

describe("ObjectUtils.getValueFromStringKey", () => {
    it("gets a deeply nested value by dot-path", () => {
        const obj = { a: { b: { c: 42 } } };
        expect(ObjectUtils.getValueFromStringKey(obj, "a.b.c")).toBe(42);
    });

    it("returns undefined for a missing key path", () => {
        expect(ObjectUtils.getValueFromStringKey({}, "x.y")).toBeUndefined();
    });

    it("gets a top-level value", () => {
        expect(ObjectUtils.getValueFromStringKey({ name: "Alice" }, "name")).toBe("Alice");
    });
});

describe("ObjectUtils.mapArrayToObject", () => {
    it("maps array items to an object keyed by id", () => {
        const arr = [
            { id: "a", name: "Alice" },
            { id: "b", name: "Bob" },
        ];
        const result = ObjectUtils.mapArrayToObject(arr);
        expect(result.a.name).toBe("Alice");
        expect(result.b.name).toBe("Bob");
    });

    it("returns empty object for empty array", () => {
        expect(ObjectUtils.mapArrayToObject([])).toEqual({});
    });
});

describe("ObjectUtils.findItemFromId", () => {
    const list = [
        { id: "1", name: "A" },
        { id: "2", name: "B" },
    ];

    it("finds and returns the item with the matching id", () => {
        expect(ObjectUtils.findItemFromId(list, "1")).toMatchObject({ name: "A" });
    });

    it("returns undefined when id is not found", () => {
        expect(ObjectUtils.findItemFromId(list, "999")).toBeUndefined();
    });

    it("returns empty object for empty list", () => {
        expect(ObjectUtils.findItemFromId([], "1")).toEqual({});
    });
});

describe("ObjectUtils.removeItemFromId", () => {
    it("removes the item with the matching id", () => {
        const list = [{ id: "1" }, { id: "2" }];
        const result = ObjectUtils.removeItemFromId(list, "1");
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");
    });

    it("returns the original list if id is not found", () => {
        const list = [{ id: "1" }];
        expect(ObjectUtils.removeItemFromId(list, "999")).toHaveLength(1);
    });
});

describe("ObjectUtils.compareTwoStringArray", () => {
    it("returns true when both arrays contain the same elements (different order)", () => {
        expect(ObjectUtils.compareTwoStringArray(["a", "b"], ["b", "a"])).toBe(true);
    });

    it("returns false when arrays have different elements", () => {
        expect(ObjectUtils.compareTwoStringArray(["a"], ["b"])).toBe(false);
    });

    it("returns false when arrays have different lengths", () => {
        expect(ObjectUtils.compareTwoStringArray(["a"], ["a", "b"])).toBe(false);
    });
});

describe("ObjectUtils.updateArrayById", () => {
    it("replaces the item with the matching id", () => {
        const arr = [{ id: "1", name: "Old" }, { id: "2", name: "B" }] as any;
        const result = ObjectUtils.updateArrayById(arr, { id: "1", name: "New" });
        expect(result[0].name).toBe("New");
        expect(result[1].name).toBe("B");
    });

    it("leaves the array unchanged when no item matches", () => {
        const arr = [{ id: "1", name: "A" }] as any;
        const result = ObjectUtils.updateArrayById(arr, { id: "999", name: "X" });
        expect(result[0].name).toBe("A");
    });
});

describe("ObjectUtils.removeArrayById", () => {
    it("removes the item with the matching id", () => {
        const arr = [{ id: "1" }, { id: "2" }];
        const result = ObjectUtils.removeArrayById(arr, "1");
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");
    });

    it("returns original array when id is not found", () => {
        const arr = [{ id: "1" }];
        expect(ObjectUtils.removeArrayById(arr, "999")).toHaveLength(1);
    });
});

describe("ObjectUtils.mapObjectToArray", () => {
    it("converts an object to an array with id from key", () => {
        const obj = { foo: { name: "Foo" }, bar: { name: "Bar" } };
        const result = ObjectUtils.mapObjectToArray(obj);
        expect(result).toHaveLength(2);
        expect(result.find((i: any) => i.id === "foo")?.name).toBe("Foo");
    });

    it("returns empty array for null input", () => {
        expect(ObjectUtils.mapObjectToArray(null)).toEqual([]);
    });
});

describe("ObjectUtils.setValueFromStringKey", () => {
    it("sets a nested value by dot-path", () => {
        const obj = { a: { b: 1 } };
        const result = ObjectUtils.setValueFromStringKey(obj, "a.b", 99);
        expect(result.a.b).toBe(99);
    });

    it("merges top-level when keyString is empty", () => {
        const obj = { x: 1 };
        const result = ObjectUtils.setValueFromStringKey(obj, "", { y: 2 });
        expect(result.y).toBe(2);
        expect(result.x).toBe(1);
    });
});

describe("ObjectUtils.sliceArrayToMui", () => {
    it("splits array into chunks of the given size", () => {
        const result = ObjectUtils.sliceArrayToMui([1, 2, 3, 4, 5] as any, 2);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual([1, 2]);
        expect(result[2]).toEqual([5]);
    });

    it("returns a single chunk when array is smaller than chunk size", () => {
        const result = ObjectUtils.sliceArrayToMui([1, 2] as any, 10);
        expect(result).toHaveLength(1);
    });
});

describe("ObjectUtils.arrayMove", () => {
    it("moves element from oldIndex to newIndex", () => {
        const arr = [1, 2, 3] as any;
        const result = ObjectUtils.arrayMove(arr, 0, 2);
        expect(result[2]).toBe(1);
    });

    it("returns original array when newIndex is out of bounds", () => {
        const arr = [1, 2, 3] as any;
        const result = ObjectUtils.arrayMove(arr, 0, 10);
        expect(result).toBe(arr);
    });
});

describe("ObjectUtils.arrayIsContainArray", () => {
    it("returns true when big array contains all items of small array", () => {
        expect(ObjectUtils.arrayIsContainArray(["a", "b", "c"], ["a", "b"])).toBe(true);
    });

    it("returns false when big array is missing an item from small array", () => {
        expect(ObjectUtils.arrayIsContainArray(["a"], ["a", "b"])).toBe(false);
    });
});
