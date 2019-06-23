import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
