import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from './app-material.module';

import {appRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {BranchCreatorComponent} from './branch-creator/branch-creator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TreeCreatorComponent} from './tree-creator/tree-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    BranchCreatorComponent,
    PageNotFoundComponent,
    TreeCreatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}
    ),
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
