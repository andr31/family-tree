import {MatButtonModule, MatCheckboxModule, MatIcon, MatIconModule, MatMenuModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule
  ],
  declarations: [],
  exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatCheckboxModule]
})

export class AppMaterialModule {
}
