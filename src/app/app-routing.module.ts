import { AuthGuard } from './route-guards/auth/auth.guard';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { NotAuthGuard } from './route-guards/not-auth/not-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play-quiz/:id', component: PlayQuizComponent, data: { animation: 'play-quiz' } },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard], data: { animation: 'login' } },
  { path: 'signup', component: SignUpComponent, canActivate: [NotAuthGuard], data: { animation: 'signup' } },
  { path: 'create-quiz', component: CreateQuizComponent, canActivate: [AuthGuard], data: { animation: 'create-quiz' } },
  { path: 'edit-quiz/:id', component: CreateQuizComponent, canActivate: [AuthGuard], data: { animation: 'edit-quiz' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
