import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatRadioModule, MatSelectModule, MatStepperModule, MatTreeModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule,
    MatChipsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatMomentDateModule, MatTreeModule, MatCardModule,
    MatStepperModule, MatSelectModule, MatRadioModule, MatDialogModule
  ],
  declarations: [],
  exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule,
    MatChipsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatMomentDateModule, MatTreeModule, MatCardModule,
    MatStepperModule, MatSelectModule, MatRadioModule, MatDialogModule]
})

export class AppMaterialModule {
}
