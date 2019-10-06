import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { OverlayComponent } from './overlay/overlay.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { QuizzesSliderComponent } from './quizzes-slider/quizzes-slider.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './common/HTTP/AuthHttpInterceptor';
import { ManageQuizComponent } from './manage-quiz/create-quiz.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserQuizzesComponent } from './user-quizzes/user-quizzes.component';
import { QuizComponent } from './quiz/quiz.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './info/info.component';
import { HistoryComponent } from './history/history.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorsHandler } from './common/errors/errors-handler';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImageInputComponent } from './view/image-input/image-input.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    TooltipDirective,
    OverlayComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    SignUpComponent,
    SideNavComponent,
    QuizzesSliderComponent,
    PlayQuizComponent,
    ManageQuizComponent,
    AccountComponent,
    AccountDetailsComponent,
    UserQuizzesComponent,
    QuizComponent,
    SearchComponent,
    InfoComponent,
    HistoryComponent,
    MenuComponent,
    ImageInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ToastrModule.forRoot(environment.notificationsConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
