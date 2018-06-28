import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {of as ofObservable, Observable} from 'rxjs';
import {FamilyDatabase} from '../family-database-utility/FamilyDatabase';
import {FamilyNode} from '../family-database-utility/FamilyNode';
import {FamilyFlatNode} from '../family-database-utility/FamilyFlatNode';

@Component({
  selector: 'app-branch-creator',
  templateUrl: './branch-creator.component.html',
  styleUrls: ['./branch-creator.component.scss'],
  providers: [FamilyDatabase]
})
export class BranchCreatorComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<FamilyFlatNode, FamilyNode> = new Map<FamilyFlatNode, FamilyNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<FamilyNode, FamilyFlatNode> = new Map<FamilyNode, FamilyFlatNode>();
  treeControl: FlatTreeControl<FamilyFlatNode>;
  treeFlattener: MatTreeFlattener<FamilyNode, FamilyFlatNode>;
  dataSource: MatTreeFlatDataSource<FamilyNode, FamilyFlatNode>;
  hasChild = (_: number, _nodeData: FamilyFlatNode) => _nodeData.expandable;
  private getLevel = (node: FamilyFlatNode) => node.level;
  private isExpandable = (node: FamilyFlatNode) => node.expandable;
  private getChildren = (node: FamilyNode): Observable<FamilyNode[]> => ofObservable(node.children);

  constructor(private database: FamilyDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FamilyFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  private transformer = (node: FamilyNode, level: number) => {
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

  ngOnInit() {
  }

  onSubmit(model) {
    console.log(model);
  }
}
