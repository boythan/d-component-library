import LayoutTableManager from "./LayoutTableManager";

const TABLE_KEY = "test-table";

const makeLayout = (id: string, isDefault = false) => ({
    id,
    name: `Layout ${id}`,
    columnsIds: ["col1", "col2"],
    isDefault,
});

beforeEach(() => {
    localStorage.clear();
});

describe("LayoutTableManager.getTableLayouts", () => {
    it("returns empty array for an unknown table key", () => {
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toEqual([]);
    });
});

describe("LayoutTableManager.createLayout", () => {
    it("adds a layout to the table", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toHaveLength(1);
    });

    it("stores the layout data correctly", () => {
        const layout = makeLayout("1", true);
        LayoutTableManager.createLayout(layout, TABLE_KEY);
        const result = LayoutTableManager.getTableLayouts(TABLE_KEY);
        expect(result[0].id).toBe("1");
        expect(result[0].isDefault).toBe(true);
    });

    it("appends multiple layouts", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        LayoutTableManager.createLayout(makeLayout("2"), TABLE_KEY);
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toHaveLength(2);
    });
});

describe("LayoutTableManager.updateLayout", () => {
    it("updates the layout name for a matching id", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        LayoutTableManager.updateLayout({ ...makeLayout("1"), name: "Updated" }, TABLE_KEY);
        const result = LayoutTableManager.getTableLayouts(TABLE_KEY);
        expect(result[0].name).toBe("Updated");
    });

    it("leaves other layouts untouched", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        LayoutTableManager.createLayout(makeLayout("2"), TABLE_KEY);
        LayoutTableManager.updateLayout({ ...makeLayout("1"), name: "Changed" }, TABLE_KEY);
        const result = LayoutTableManager.getTableLayouts(TABLE_KEY);
        expect(result[1].name).toBe("Layout 2");
    });
});

describe("LayoutTableManager.deleteLayout", () => {
    it("removes the layout with the matching id", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        LayoutTableManager.createLayout(makeLayout("2"), TABLE_KEY);
        LayoutTableManager.deleteLayout("1", TABLE_KEY);
        const result = LayoutTableManager.getTableLayouts(TABLE_KEY);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");
    });
});

describe("LayoutTableManager.setDefaultLayout", () => {
    it("marks the target layout as default and unmarks others", () => {
        LayoutTableManager.createLayout(makeLayout("1", true), TABLE_KEY);
        LayoutTableManager.createLayout(makeLayout("2", false), TABLE_KEY);
        LayoutTableManager.setDefaultLayout("2", TABLE_KEY);
        const result = LayoutTableManager.getTableLayouts(TABLE_KEY);
        expect(result.find((l: any) => l.id === "2").isDefault).toBe(true);
        expect(result.find((l: any) => l.id === "1").isDefault).toBe(false);
    });
});

describe("LayoutTableManager.saveTableLayouts", () => {
    it("replaces all layouts for the table key", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        const newLayouts = [makeLayout("A"), makeLayout("B")];
        LayoutTableManager.saveTableLayouts(newLayouts, TABLE_KEY);
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toHaveLength(2);
    });
});

describe("LayoutTableManager.clearTableLayout", () => {
    it("removes all layouts for the given table key", () => {
        LayoutTableManager.createLayout(makeLayout("1"), TABLE_KEY);
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toHaveLength(1);
        LayoutTableManager.clearTableLayout(TABLE_KEY);
        // getTableLayouts uses ?? [] so null stored value returns []
        expect(LayoutTableManager.getTableLayouts(TABLE_KEY)).toHaveLength(0);
    });
});

describe("LayoutTableManager.getAllLayouts", () => {
    it("returns an object with all table keys", () => {
        LayoutTableManager.createLayout(makeLayout("1"), "table-a");
        LayoutTableManager.createLayout(makeLayout("2"), "table-b");
        const all = LayoutTableManager.getAllLayouts();
        expect(all["table-a"]).toBeDefined();
        expect(all["table-b"]).toBeDefined();
    });
});
