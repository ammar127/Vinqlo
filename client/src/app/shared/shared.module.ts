import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AlphaOnlyDirective } from './Directives/alpha-only.directive';
import { AlphaNumericOnlyDirective } from './Directives/alphanumeric-only.directive';
import { AlphaSpaceOnlyDirective } from './Directives/alphaspace-only.directive';
import { NumericOnlyDirective } from './Directives/numeric-only.directive';
import { UsernameDirective } from './Directives/username.directive';
import { ErrorsComponent } from './errors/errors.component';
import { DecimalOnlyDirective } from './Directives/decimal-only.directive';
import { ShowAuthedDirective } from './Directives/show-authed.directive';
import { ImagePipe } from './Pipes/image.pipe';
import { LoaderComponent } from './loader/loader.component';
import { NoContentComponent } from './no-content/no-content.component';


@NgModule({
  declarations: [
    AlphaOnlyDirective,
    NumericOnlyDirective,
    AlphaNumericOnlyDirective,
    AlphaSpaceOnlyDirective,
    UsernameDirective,
    DecimalOnlyDirective,
    ShowAuthedDirective,
    ErrorsComponent,
    ImagePipe,
    LoaderComponent,
    NoContentComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule, FormsModule,
    HttpClientModule,

  ],
  exports: [
    // shared modules
    NgbModule,
    HttpClientModule,
    NgSelectModule, FormsModule,
    ReactiveFormsModule,


    // shared directives
    AlphaOnlyDirective,
    NumericOnlyDirective,
    AlphaNumericOnlyDirective,
    AlphaSpaceOnlyDirective,
    UsernameDirective,
    DecimalOnlyDirective,
    ShowAuthedDirective,

    // components
    ErrorsComponent,

    //Pipes
    ImagePipe
  ]
})
export class SharedModule { }
