import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KafaatLayoutComponent } from './layout-pages/kafaat-layout/kafaat-layout.component';
import { HomePageComponent } from './kafaat/components/home-page/home-page.component';
import { LoginComponent } from './kafaat/components/login/login.component';
import { ForgottenPasswordComponent } from './kafaat/components/forgotten-password/forgotten-password.component';
import { CodeAuthComponent } from './kafaat/components/code-auth/code-auth.component';
import { NewPasswordComponent } from './kafaat/components/new-password/new-password.component';
import { RegisterationComponent } from './kafaat/components/registeration/registeration.component';
import { RegisterationSucceededComponent } from './kafaat/components/registeration-succeeded/registeration-succeeded.component';
import { DashboardLayoutComponent } from './layout-pages/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { LoginComponent as AdminLogin } from './dashboard/components/login/login.component' ;
import { AdminGuard } from './dashboard/core/guards/admin.guard';
import { MemberGuard } from './dashboard/core/guards/member.guard';

const routes: Routes = [
  {path:'',component:KafaatLayoutComponent,children:[
    {path:'',component:HomePageComponent},
    {path:'kafaat',loadChildren:()=>import('./kafaat/kafaat.module').then(m=>m.KafaatModule)},
  ]},
  {path:'',component:DashboardLayoutComponent,children:[
    {path:'',component:HomeComponent},
    {path:'admin',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),canActivate:[AdminGuard]},
  ]},
  {path:'admin-login',component:AdminLogin},
  {path:'registeration',component:RegisterationComponent},
  {path:'registeration-succeeded',component:RegisterationSucceededComponent},
  {path:'login',component:LoginComponent},
  {path:'forgotten-password',component:ForgottenPasswordComponent},
  {path:'code-auth',component:CodeAuthComponent},
  {path:'change-password',component:NewPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
