import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule, MatInputModule,
  MatMenuModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule, MatChipsModule, MatInputModule, MatButtonModule
  ],
  declarations: [],
  exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule,
    MatChipsModule, MatInputModule, MatButtonModule]
})

export class AppMaterialModule {
}
