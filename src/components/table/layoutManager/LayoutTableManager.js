const ALL_LAYOUT_TABLE_KEY = "ALL_LAYOUT_TABLE_KEY";

const LayoutTableManager = {};

LayoutTableManager.clearAll = () => {
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, null);
};

LayoutTableManager.clearTableLayout = (tableKey) => {
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = null;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.saveNewLayout = (layout, tableKey, name) => {
    const newLayout = LayoutTableManager.getLayout(tableKey);
    newLayout[name] = layout;
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = newLayout;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.saveTableLayout = (tableLayout, tableKey) => {
    const allLayout = LayoutTableManager.getAllLayout();
    allLayout[tableKey] = tableLayout;
    return localStorage.setItem(ALL_LAYOUT_TABLE_KEY, JSON.stringify(allLayout));
};

LayoutTableManager.getAllLayout = () => {
    const allLayout = JSON.parse(localStorage.getItem(ALL_LAYOUT_TABLE_KEY)) || {};
    return allLayout;
};

LayoutTableManager.getLayout = (key) => {
    const allLayout = LayoutTableManager.getAllLayout();
    return allLayout?.[key] ?? {};
};

export default LayoutTableManager;
