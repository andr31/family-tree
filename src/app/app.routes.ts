import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TreeCreatorComponent} from './tree-creator/tree-creator.component';
import {BranchCreatorComponent} from './branch-creator/branch-creator.component';

export const appRoutes: Routes = [
  {path: 'get-started', component: TreeCreatorComponent},
  {path: 'my-branch', component: BranchCreatorComponent},
  {
    path: '',
    redirectTo: '/get-started',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];
