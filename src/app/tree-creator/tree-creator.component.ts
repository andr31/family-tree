import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FamilyDatabase} from '../family-database-utility/FamilyDatabase';
import {FamilyNodeDetails} from '../family-database-utility/FamilyNodeDetails';

@Component({
  selector: 'app-tree-creator',
  templateUrl: './tree-creator.component.html',
  styleUrls: ['./tree-creator.component.scss'],
  providers: [FamilyDatabase]
})
export class TreeCreatorComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isLinear = false;
  selfFormGroup: FormGroup;
  motherFormGroup: FormGroup;
  fatherFormGroup: FormGroup;
  grandMotherFormGroup: FormGroup;
  grandFatherFormGroup: FormGroup;
  displayStepper: boolean;

  someMethod() {
    this.trigger.openMenu();
  }

  constructor(private _formBuilder: FormBuilder, private familyDb: FamilyDatabase, private router: Router) {
  }

  ngOnInit() {
    this.displayStepper = false;
    this.initValidations();
  }

  private initValidations() {
    this.selfFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male', Validators.required],
      birthDate: ['', Validators.required],
    });
    this.motherFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['female', Validators.required],
      birthDate: ['', Validators.required],
    });
    this.fatherFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male', Validators.required],
      birthDate: ['', Validators.required],
    });
    this.grandMotherFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['female', Validators.required],
      birthDate: ['', Validators.required],
    });
    this.grandFatherFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  createTree() {
    this.familyDb.insertItem(this.prepareNode()).then(() => this.router.navigate(['/my-branch']));
  }

  private prepareNode() {
    const selfData = this.selfFormGroup.value;
    const motherData = this.motherFormGroup.value;
    const fatherData = this.fatherFormGroup.value;
    const grandMotherData = this.grandMotherFormGroup.value;
    const grandFatherData = this.grandFatherFormGroup.value;
    motherData.spouse = {
      name: fatherData.firstName,
      surname: fatherData.lastName,
      birthdate: fatherData.birthDate.toDate(),
      gender: fatherData.gender
    } as FamilyNodeDetails;
    fatherData.spouse = {
      name: motherData.firstName,
      surname: motherData.lastName,
      birthdate: motherData.birthDate.toDate(),
      gender: motherData.gender
    } as FamilyNodeDetails;
    fatherData.children = [{
      name: selfData.firstName,
      surname: selfData.lastName,
      birthdate: selfData.birthDate.toDate(),
      spouse: {},
      gender: selfData.gender
    }];
    grandMotherData.spouse = {
      name: grandFatherData.firstName,
      surname: grandFatherData.lastName,
      birthdate: grandFatherData.birthDate.toDate(),
      gender: grandFatherData.gender
    } as FamilyNodeDetails;
    grandFatherData.spouse = {
      name: grandMotherData.firstName,
      surname: grandMotherData.lastName,
      birthdate: grandMotherData.birthDate.toDate(),
      gender: grandMotherData.gender
    } as FamilyNodeDetails;
    grandFatherData.children = [{
      name: fatherData.firstName,
      surname: fatherData.lastName,
      birthdate: fatherData.birthDate.toDate(),
      spouse: fatherData.spouse,
      children: fatherData.children,
      gender: fatherData.gender
    }];
    const node = {
      name: grandFatherData.firstName,
      surname: grandFatherData.lastName,
      birthdate: grandFatherData.birthDate.toDate(),
      gender: grandFatherData.gender,
      spouse: grandFatherData.spouse,
      children: grandFatherData.children
    };
    return node;
  }

}
