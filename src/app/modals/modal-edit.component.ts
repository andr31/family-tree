import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal-edit-dialog',
  templateUrl: 'modal-edit.template.html',
})
export class ModalEditComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
