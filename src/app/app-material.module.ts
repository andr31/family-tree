import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatTreeModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule,
    MatChipsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatMomentDateModule, MatTreeModule
  ],
  declarations: [],
  exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule,
    MatChipsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatMomentDateModule, MatTreeModule]
})

export class AppMaterialModule {
}
