import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatRadioModule } from '@ngx-formly/material/radio';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

import { FormlyMaterialModule } from '@ngx-formly/material';
import { GraphQLModule } from './core/graphql.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    GraphQLModule,
    FormlyMatRadioModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
