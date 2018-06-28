import {BehaviorSubject} from 'rxjs';
import {FamilyNode} from './FamilyNode';
import {AngularFirestore} from 'angularfire2/firestore';
import * as _ from 'lodash';
import {FamilyNodeDetails} from './FamilyNodeDetails';
import {Injectable} from '@angular/core';

@Injectable()
export class FamilyDatabase {
  dataChange: BehaviorSubject<FamilyNode[]> = new BehaviorSubject<FamilyNode[]>([]);

  get data(): FamilyNode[] {
    return this.dataChange.value;
  }

  constructor(private db: AngularFirestore) {
    this.initialize();
  }

  initialize() {
    this.db.collection('tree').valueChanges().subscribe(r => {
      // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
      //     file node as children.
      const data = this.buildFileTree(r, 0);
      // Notify the change.
      this.dataChange.next(data);
    });
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(value: any, level: number) {
    const data: any[] = [];
    _.forEach(value, v => {
      const node = new FamilyNode();
      node.item = v;
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v.children, level + 1);
      } else {
        node.item = v;
      }
      data.push(node);
    });
    console.log(data);
    return data;
  }

  /** Add an item to to-do list */
  insertItem(item: Object) {
    return this.db.collection('tree').add(item);
  }

  updateItem(node: FamilyNode, name: FamilyNodeDetails) {
    node.item = name;
    this.dataChange.next(this.data);
  }

}
