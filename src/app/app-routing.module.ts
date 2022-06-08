import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "user",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/session/session.module").then(
            (m) => m.SessionModule
          ),
      },
    ],
  },
  {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        path: "user",
        loadChildren: () =>
          import("./views/user/user.module").then((m) => m.UserModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "user",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
