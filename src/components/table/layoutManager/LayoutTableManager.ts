const ALL_LAYOUT_TABLE_KEY = "ALL_LAYOUT_TABLE_KEY";

const LayoutTableManager: any = {};

LayoutTableManager.clearAll = () => {
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, null as any);
};

LayoutTableManager.clearTableLayout = (tableKey: any) => {
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = null;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.saveNewLayout = (layout: any, tableKey: any, name: any) => {
    const newLayout = LayoutTableManager.getLayout(tableKey);
    newLayout[name] = layout;
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = newLayout;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.saveTableLayout = (tableLayout: any, tableKey: any) => {
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = tableLayout;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.getAllLayout = () => {
    const allLayout = JSON.parse(localStorage.getItem(ALL_LAYOUT_TABLE_KEY) as any) || {};
    return allLayout;
};

LayoutTableManager.getLayout = (key: any) => {
    const allLayout = LayoutTableManager.getAllLayout();
    return allLayout?.[key] ?? {};
};

export default LayoutTableManager;
