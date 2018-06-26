import {Component, Input, OnInit} from '@angular/core';
import {FamilyFlatNode} from './FamilyFlatNode';
import {FamilyNode} from './FamilyNode';
import {FamilyNodeDetails} from './FamilyNodeDetails';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FamilyDatabase} from './FamilyDatabase';
import {of as ofObservable, Observable} from 'rxjs';

@Component({
  selector: 'app-branch-creator',
  templateUrl: './branch-creator.component.html',
  styleUrls: ['./branch-creator.component.scss'],
  providers: [FamilyDatabase]
})
export class BranchCreatorComponent implements OnInit {
  @Input() displayForm: boolean;
  model = {name: '', surName: ''};
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<FamilyFlatNode, FamilyNode> = new Map<FamilyFlatNode, FamilyNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<FamilyNode, FamilyFlatNode> = new Map<FamilyNode, FamilyFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: FamilyFlatNode | null = null;
  /** The new item's name */
  newItemName: FamilyNodeDetails = new FamilyNodeDetails();
  treeControl: FlatTreeControl<FamilyFlatNode>;
  treeFlattener: MatTreeFlattener<FamilyNode, FamilyFlatNode>;
  dataSource: MatTreeFlatDataSource<FamilyNode, FamilyFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<FamilyFlatNode>(true /* multiple */);

  constructor(private database: FamilyDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FamilyFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: FamilyFlatNode) => node.level;
  isExpandable = (node: FamilyFlatNode) => node.expandable;
  getChildren = (node: FamilyNode): Observable<FamilyNode[]> => ofObservable(node.children);
  hasChild = (_: number, _nodeData: FamilyFlatNode) => _nodeData.expandable;
  hasNoContent = (_: number, _nodeData: FamilyFlatNode) => _nodeData.item === new FamilyNodeDetails();

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FamilyNode, level: number) => {
    const flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.item === node.item
      ? this.nestedNodeMap.get(node)!
      : new FamilyFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: FamilyFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FamilyFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FamilyFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: FamilyFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, new FamilyNodeDetails());
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: FamilyFlatNode, itemValue: FamilyNodeDetails) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

  ngOnInit() {
  }

  onSubmit(model) {
    console.log(model);
  }
}
