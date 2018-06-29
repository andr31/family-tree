import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from './app-material.module';

import {appRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {BranchCreatorComponent} from './branch-creator/branch-creator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TreeCreatorComponent} from './tree-creator/tree-creator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebaseConfig';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FireBaseTimestampToDatePipe} from './pipes/firebase-timestamp-to-date.pipe';
import {ModalEditComponent} from './modals/modal-edit.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BranchCreatorComponent,
    PageNotFoundComponent,
    TreeCreatorComponent,
    ModalEditComponent,
    FireBaseTimestampToDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebase.firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}
    ),
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalEditComponent]
})
export class AppModule {
}
