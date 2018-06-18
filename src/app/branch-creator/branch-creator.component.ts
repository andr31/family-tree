import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-branch-creator',
  templateUrl: './branch-creator.component.html',
  styleUrls: ['./branch-creator.component.scss']
})
export class BranchCreatorComponent implements OnInit {
  @Input() displayForm: boolean;
  model = {name: '', surName: ''};

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(model) {
    console.log('model', model);
  }

}
