import _ from "lodash";

export interface ILayoutTableManager {
    id: string;
    name: string;
    columnsIds: string[];
    isDefault: boolean;
}

const ALL_LAYOUT_TABLE_KEY = "ALL_LAYOUT_TABLE_KEY";

const LayoutTableManager: any = {};

LayoutTableManager.clearAll = () => {
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, [] as any);
};

LayoutTableManager.clearTableLayout = (tableKey: any) => {
    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = null;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.createLayout = (layout: ILayoutTableManager, tableKey: any) => {
    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = [...tableLayouts, layout];
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.updateLayout = (newLayout: ILayoutTableManager, tableKey: any) => {
    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const tableLayoutResult = _.map(tableLayouts, (layout) => {
        if (layout.id === newLayout.id) return newLayout;
        return layout;
    });

    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = tableLayoutResult;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.deleteLayout = (layoutId: string, tableKey: any) => {
    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const tableLayoutResult = _.filter(tableLayouts, (layout) => layout.id !== layoutId);

    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = tableLayoutResult;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.setDefaultLayout = (layoutId: string, tableKey: any) => {
    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const tableLayoutResult = _.map(tableLayouts, (layout) => {
        if (layout.id === layoutId) {
            return { ...layout, isDefault: true };
        }
        return { ...layout, isDefault: false };
    });

    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = tableLayoutResult;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

/**
 * *********************** MANAGE ALL LAYOUTS ***********************
 */
LayoutTableManager.getAllLayouts = () => {
    const allLayout = JSON.parse(localStorage.getItem(ALL_LAYOUT_TABLE_KEY) as any) || {};
    return allLayout;
};

LayoutTableManager.getTableLayouts = (tableKey: string) => {
    const allLayout = LayoutTableManager.getAllLayouts();
    return allLayout?.[tableKey] ?? [];
};

LayoutTableManager.saveTableLayouts = (tableLayouts: ILayoutTableManager[], tableKey: any) => {
    const allLayout = LayoutTableManager.getAllLayouts();
    allLayout[tableKey] = tableLayouts;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

export default LayoutTableManager;
