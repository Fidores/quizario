import { UserGuard } from './route-guards/user/user.guard';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { AuthGuard } from './route-guards/auth/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play-quiz/:id', component: PlayQuizComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'create-quiz', component: CreateQuizComponent, canActivate: [UserGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
