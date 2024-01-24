import { OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import * as i0 from "@angular/core";
export declare class TreeNodeChildrenComponent {
    node: TreeNode;
    templates: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeChildrenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeChildrenComponent, "tree-node-children", never, { "node": "node"; "templates": "templates"; }, {}, never, never, false>;
}
export declare class TreeNodeCollectionComponent implements OnInit, OnDestroy {
    get nodes(): any;
    set nodes(nodes: any);
    treeModel: TreeModel;
    _nodes: any;
    private virtualScroll;
    templates: any;
    viewportNodes: TreeNode[];
    get marginTop(): string;
    _dispose: any[];
    setNodes(nodes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    trackNode(index: any, node: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeCollectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeCollectionComponent, "tree-node-collection", never, { "nodes": "nodes"; "treeModel": "treeModel"; "templates": "templates"; }, {}, never, never, false>;
}
export declare class TreeNodeComponent {
    node: TreeNode;
    index: number;
    templates: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeComponent, "TreeNode, tree-node", never, { "node": "node"; "index": "index"; "templates": "templates"; }, {}, never, never, false>;
}
