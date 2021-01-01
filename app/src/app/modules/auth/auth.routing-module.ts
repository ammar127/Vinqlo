import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from 'src/app/email-confirmation/email-confirmation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
  path: 'login',
  component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'emailConfirmation',
    component: EmailConfirmationComponent,

  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }