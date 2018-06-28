import {Component, Inject} from '@angular/core';
import {DialogPosition, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FamilyNodeDetails} from '../family-database-utility/FamilyNodeDetails';

@Component({
  selector: 'app-modal-edit-dialog',
  templateUrl: 'modal-edit.template.html',
})
export class ModalEditComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FamilyNodeDetails) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
