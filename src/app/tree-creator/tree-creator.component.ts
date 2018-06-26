import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-tree-creator',
  templateUrl: './tree-creator.component.html',
  styleUrls: ['./tree-creator.component.css']
})
export class TreeCreatorComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  constructor() {
  }

  ngOnInit() {
  }

}
