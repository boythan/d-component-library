declare const _default: {
    getAllSiblings: (nodeId: string, dataList?: any[]) => any[];
    getAllChild: (nodeId: string, dataList?: any[]) => any[];
    isLeafNode: (nodeId: string, dataList?: any[]) => boolean;
    isRootNode: (nodeId: string, dataList?: any[]) => boolean;
    mapListDataToTree: (list?: any[]) => any[];
    getAllSiblingCategory: (nodeId: string, dataList?: any[]) => any[];
    getAllChildCategory: (nodeId: string, dataList?: any[]) => any[];
    getAllChildAndSubChild: (nodeId: string, dataList?: any[]) => any[];
    getLevelOfNode: (nodeId: string, treeList?: never[]) => number;
};
export default _default;
