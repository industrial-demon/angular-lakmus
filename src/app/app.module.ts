import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatModule } from './app.mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DiagnosAutocompleteComponent } from './diagnos-atocomolete/diagnos-atocomolete.component';
import { DebounceInputDirective } from './shared/directives/debounce-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    DiagnosAutocompleteComponent,
    DebounceInputDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
