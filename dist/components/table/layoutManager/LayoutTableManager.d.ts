export default LayoutTableManager;
declare namespace LayoutTableManager {
    function clearAll(): void;
    function clearTableLayout(tableKey: any): void;
    function saveNewLayout(layout: any, tableKey: any, name: any): void;
    function saveTableLayout(tableLayout: any, tableKey: any): void;
    function getAllLayout(): any;
    function getLayout(key: any): any;
}
