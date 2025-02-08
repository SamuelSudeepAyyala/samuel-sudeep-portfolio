import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; // Import the HomeModule
import { ExperienceComponent } from './experience/experience.component';

@NgModule({
  declarations: [AppComponent, HomeComponent,ExperienceComponent],
  imports: [
    BrowserModule,
    HomeComponent,
    ExperienceComponent
  ],
  providers: [],
  bootstrap: [AppComponent, HomeComponent, ExperienceComponent]
})
export class AppModule { }
