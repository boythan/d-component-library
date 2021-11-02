import _ from "lodash";

export const mapListDataToTree = (list: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const map: any = {};
    let node: any = {};
    const roots = [];
    let i = 0;
    try {
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            // if (node.parent_id && list[map[node.parent_id]]) {
            if (node[parentKey]) {
                // if you have dangling branches check that map[node.parentId] exists
                if (!list[map[node[parentKey]]]) {
                    // eslint-disable-next-line no-throw-literal
                    throw `dont have Parent NODE (${node[parentKey]}) of nodeid ${node.id}`;
                }
                list[map[node[parentKey]]].children.push(node);
            } else {
                roots.push(node);
            }
        }
    } catch (err) {
        console.log(err);
    }

    return roots;
};

export const getAllSiblings = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const currentNode = dataList.find((item) => item.id === nodeId);
    let allSibling = [];
    if (currentNode[parentKey]) {
        allSibling = dataList.filter((item) => item[parentKey] && item[parentKey] === currentNode[parentKey]);
    } else {
        allSibling = dataList.filter((item) => !item[parentKey]);
    }
    return _.sortBy(allSibling, (item) => item.priority);
};

export const getAllSiblingCategory = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const currentNode = dataList.find((item) => item.id === nodeId);
    let allSibling = [];
    if (currentNode[parentKey]) {
        allSibling = dataList.filter((item) => item[parentKey] && item[parentKey] === currentNode[parentKey]);
    } else {
        allSibling = dataList.filter((item) => !item[parentKey]);
    }
    return _.sortBy(allSibling, (item) => item.position);
};

export const getAllChild = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const childNodes = dataList.filter((item) => item[parentKey] === nodeId);
    return _.sortBy(childNodes, (item) => item.priority);
};

export const getAllChildCategory = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const childNodes = dataList.filter((item) => item?.[parentKey] === nodeId);
    return _.sortBy(childNodes, (item) => item.position);
};

export const isLeafNode = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const children = getAllChild(nodeId, dataList, parentIdKey);
    return children.length === 0;
};

export const isRootNode = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const currentNode: any = dataList.filter((item) => item.id === nodeId);
    return !currentNode[parentKey];
};

export const getAllChildAndSubChild = (nodeId: string, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    const childNodes = dataList.filter((item) => item?.[parentKey] === nodeId);
    if (_.isEmpty(childNodes)) {
        return [];
    }
    let result = [...childNodes];
    childNodes.forEach((item) => {
        const subChildNode = getAllChildAndSubChild(item?.id, dataList, parentIdKey);
        if (!_.isEmpty(subChildNode)) {
            result = [...result, ...subChildNode];
        }
    });
    return result;
};

export const searchNode = (findId: string, checkNode: any, getId = (node: any) => node?.id): any => {
    if (findId === getId(checkNode)) {
        return checkNode;
    }
    if (checkNode?.children?.length > 0) {
        let result = null;
        let i;
        // eslint-disable-next-line no-plusplus
        for (i = 0; result == null && i < checkNode.children.length; i++) {
            result = searchNode(findId, checkNode?.children?.[i], getId);
        }
        return result;
    }
    return null;
};

export const searchNodeFromTreeList = (nodeId: string, treeList = [], getId?: any) => {
    let i;
    let result = null;
    // eslint-disable-next-line no-plusplus
    for (i = 0; result == null && i < treeList.length; i++) {
        result = searchNode(nodeId, treeList[i], getId);
    }
    return result;
};

export const getLevel = (obj: any) => {
    let depth = 0;
    if (obj.children) {
        obj.children.forEach((d: any) => {
            const tmpDepth = getLevel(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        });
    }
    return 1 + depth;
};

export const getLevelOfNode = (nodeId: string, treeList = []) => {
    const nodeItem = searchNodeFromTreeList(nodeId, treeList);
    return getLevel(nodeItem);
};

export const getParentNode = (parentId: string, dataList: any[]) => {
    return dataList.find((i) => i?.id === parentId) || null;
};

export const getAllParentNode = (node: any = {}, dataList: any[] = [], parentIdKey?: string) => {
    const parentKey = parentIdKey || "parent_id";
    let allParentNode: any[] = [];
    const parentId = node?.[parentKey] ?? null;
    const parentNode = getParentNode(parentId, dataList);
    if (parentNode) {
        allParentNode.push(parentNode);
        const otherParent = getAllParentNode(parentNode, dataList, parentIdKey);
        allParentNode = [...allParentNode, ...otherParent];
    }
    return allParentNode;
};

export default {
    getAllSiblings,
    getAllChild,
    isLeafNode,
    isRootNode,
    mapListDataToTree,
    getAllSiblingCategory,
    getAllChildCategory,
    getAllChildAndSubChild,
    getLevelOfNode,
    searchNodeFromTreeList,
    getAllParentNode,
};
