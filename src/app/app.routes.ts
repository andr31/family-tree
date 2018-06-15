import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TreeCreatorComponent} from './tree-creator/tree-creator.component';

export const appRoutes: Routes = [
  {path: 'simulator', component: TreeCreatorComponent},
  {
    path: '',
    redirectTo: '/simulator',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];
