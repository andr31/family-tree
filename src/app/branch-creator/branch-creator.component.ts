import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-branch-creator',
  templateUrl: './branch-creator.component.html',
  styleUrls: ['./branch-creator.component.scss']
})
export class BranchCreatorComponent implements OnInit {
  @Input() displayForm: boolean;
  model = {name: '', surName: ''};
  data = null;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.db.collection('tree').valueChanges().subscribe(r => this.data = r);
  }

  onSubmit(model) {
    console.log('model', model);
  }

}
