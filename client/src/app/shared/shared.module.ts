import { RouterModule } from '@angular/router';
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
import { CreateComponent } from './post/create/create.component';
import { ListComponent } from './post/list/list.component';
import { CardComponent } from './post/card/card.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommunityListComponent } from './community/community-list/community-list.component';
import { CommunityCreateComponent } from './community/community-create/community-create.component';


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
    NoContentComponent,
    CreateComponent,
    ListComponent,
    CardComponent,
    UploadFileComponent,
    UploadImgComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    CommunityListComponent,
    CommunityCreateComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule, FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    RouterModule
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
    LoaderComponent,
    NoContentComponent,
    CreateComponent,
    ListComponent,
    CardComponent,
    CommunityListComponent,
    CommunityCreateComponent,
    EditProfileComponent,

    //Pipes
    ImagePipe,
    LoaderComponent,
    NoContentComponent
  ]
})
export class SharedModule { }
