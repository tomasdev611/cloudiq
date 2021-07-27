import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePublic, RouteSecure } from './routes';
import { LayoutMainComponent, LayoutPublicComponent } from './components';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: '', component: LayoutMainComponent, children: RouteSecure, canActivate: [AuthGuard] },
  { path: '', component: LayoutPublicComponent, children: RoutePublic},
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
