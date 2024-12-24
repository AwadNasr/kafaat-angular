import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, routes } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { ActivityTypesComponent } from './components/activity-types/activity-types.component';
import { AddActivityTypeComponent } from './components/add-activity-type/add-activity-type.component';
import { UpdateActivityTypeComponent } from './components/update-activity-type/update-activity-type.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCategoryShowComponent } from './components/user-category-show/user-category-show.component';
import { UserCategoryAddComponent } from './components/user-category-add/user-category-add.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AddWorkTypeComponent } from './components/add-work-type/add-work-type.component';
import { EditWorkTypeComponent } from './components/edit-work-type/edit-work-type.component';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProgramsComponent } from './components/programs/programs.component';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { CitiesComponent } from './components/cities/cities.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { DistrictsComponent } from './components/districts/districts.component';
import { EditDistrictComponent } from './components/edit-district/edit-district.component';
import { AddDistrictComponent } from './components/add-district/add-district.component';
import { AddQualificationComponent } from './components/add-qualification/add-qualification.component';
import { EditQualificationComponent } from './components/edit-qualification/edit-qualification.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { SpecializationsComponent } from './components/specializations/specializations.component';
import { EditSpecializationComponent } from './components/edit-specialization/edit-specialization.component';
import { AddSpecializationsComponent } from './components/add-specializations/add-specializations.component';
import { DistinguishedTypesComponent } from './components/distinguished-types/distinguished-types.component';
import { AddDistinguishedTypesComponent } from './components/add-distinguished-types/add-distinguished-types.component';
import { EditDistinguishedTypesComponent } from './components/edit-distinguished-types/edit-distinguished-types.component';
import { AddFamilyBranchComponent } from './components/add-family-branch/add-family-branch.component';
import { EditFamilyBranchComponent } from './components/edit-family-branch/edit-family-branch.component';
import { FamilyBranchesComponent } from './components/family-branches/family-branches.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatSelectModule } from '@angular/material/select';
import { KafaatModule } from '../kafaat/kafaat.module';
import { AuthService } from '../kafaat/services/auth.service';
import { DetailsActivityComponent } from './components/details-activity/details-activity.component';
import { AttachmentsActivityComponent } from './components/attachments-activity/attachments-activity.component';
import { AddAttachmentActivityComponent } from './components/add-attachment-activity/add-attachment-activity.component';
import { ImagesActivityComponent } from './components/images-activity/images-activity.component';
import { VideosActivityComponent } from './components/videos-activity/videos-activity.component';
import { AddImagesActivityComponent } from './components/add-images-activity/add-images-activity.component';
import { AddVideoActivityComponent } from './components/add-video-activity/add-video-activity.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ContactInformationsComponent } from './components/contact-informations/contact-informations.component';
import { AdminsComponent } from './components/admins/admins.component';
import { MembersComponent } from './components/members/members.component';
import { JoinRequestsComponent } from './components/join-requests/join-requests.component';
import { ConfirmPopUpComponent } from './components/confirm-pop-up/confirm-pop-up.component';
import { UserProfilePopUpComponent } from './components/user-profile-pop-up/user-profile-pop-up.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from '../shared/shared.module';
import { ContactUsListNewComponent } from './components/contact-us-list-new/contact-us-list-new.component';
import { ContactUsListSentComponent } from './components/contact-us-list-sent/contact-us-list-sent.component';
import { ContactUsListNotSentComponent } from './components/contact-us-list-not-sent/contact-us-list-not-sent.component';
import { ContactUsAddOrUpdateResponsePopUpComponent } from './components/contact-us-add-or-update-response-pop-up/contact-us-add-or-update-response-pop-up.component';
import { SendEmailPopUpComponent } from './components/send-email-pop-up/send-email-pop-up.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddKafaatFounderComponent } from './components/add-kafaat-founder/add-kafaat-founder.component';
import { EditKafaatFounderComponent } from './components/edit-kafaat-founder/edit-kafaat-founder.component';
import { KafaatFoundersComponent } from './components/kafaat-founders/kafaat-founders.component';
import { DocumentedImagesComponent } from './components/documented-images/documented-images.component';
import { ChangeUserCategoryPopUpComponent } from './components/change-user-category-pop-up/change-user-category-pop-up.component';
import { TooltipDirective } from './core/directives/tooltip.directive';
import { MixPageComponent } from './components/mix-page/mix-page.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { MagazinePagesComponent } from './components/magazine-pages/magazine-pages.component';
import { AddMagazineComponent } from './components/add-magazine/add-magazine.component';
import { EditMagazineComponent } from './components/edit-magazine/edit-magazine.component';
import { AddMagazinePagesComponent } from './components/add-magazine-pages/add-magazine-pages.component';
import { EditMagazinePageComponent } from './components/edit-magazine-page/edit-magazine-page.component';
import { ArticleListComponent } from './components/Articles/article-list/article-list.component';
import { AddArticleComponent } from './components/Articles/add-article/add-article.component';
import { ArticleDetailsComponent } from './components/Articles/article-details/article-details.component';
import { WrittingListComponent } from './components/Writtings/writting-list/writting-list.component';
import { AddWrittingComponent } from './components/Writtings/add-writting/add-writting.component';
import { WrittingDetailsComponent } from './components/Writtings/writting-details/writting-details.component';
import { ReadingClubListComponent } from './components/ReadingClub/reading-club-list/reading-club-list.component';
import { AddReadingClubComponent } from './components/ReadingClub/add-reading-club/add-reading-club.component';
import { ReadingClubDetailsComponent } from './components/ReadingClub/reading-club-details/reading-club-details.component';
import { ReadingClubReportListComponent } from './components/ReadingClubReport/reading-club-report-list/reading-club-report-list.component';
import { AddReadingClubReportComponent } from './components/ReadingClubReport/add-reading-club-report/add-reading-club-report.component';
import { EditMemberComponent } from './components/edit-member/edit-member.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { ReadingClubBooksComponent } from './components/reading-club-books/reading-club-books.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ExcellenceAwardComponent } from './components/excellence-award/excellence-award.component';
import { AddExcellenceClubComponent } from './components/add-excellence-club/add-excellence-club.component';
import { EditExcellenceAwardComponent } from './components/edit-excellence-award/edit-excellence-award.component';
import { ExcellenceAwardDetailsComponent } from './components/excellence-award-details/excellence-award-details.component';
import { AddAwardConditionComponent } from './components/add-award-condition/add-award-condition.component';
import { EditAwardConditionComponent } from './components/edit-award-condition/edit-award-condition.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { VolunteerReportComponent } from './components/volunteer-report/volunteer-report.component';
import { AddVolunteerReportComponent } from './components/add-volunteer-report/add-volunteer-report.component';
import { VolunteerFieldListComponent } from './components/volunteer-field-list/volunteer-field-list.component';
import { AddVolunteerFieldComponent } from './components/add-volunteer-field/add-volunteer-field.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { VolunteerFieldParticipantComponent } from './components/volunteer-field-participant/volunteer-field-participant.component';
import { ChangePasswordMembersComponent } from './components/change-password-members/change-password-members.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { RequestSendSuccessComponent } from './components/request-send-success/request-send-success.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { AllMembersDistinguishedComponent } from './components/all-members-distinguished/all-members-distinguished.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { ExcellenceAwardParticipantComponent } from './components/excellence-award-participant/excellence-award-participant.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { VideoListComponent } from './video-list/video-list.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { AddVideoAlbumComponent } from './add-video-album/add-video-album.component';
import { AlbumPhotoComponent } from './components/album-photo/album-photo.component';
import { AddAlbumPhotoComponent } from './components/add-album-photo/add-album-photo.component';
import { AlbumVideoComponent } from './components/album-video/album-video.component';
import { AddAlbumVideoComponent } from './components/add-album-video/add-album-video.component';
import { ExcellencePrizeListComponent } from './components/excellence-prize-list/excellence-prize-list.component';
import { AddExcellencePrizeComponent } from './components/add-excellence-prize/add-excellence-prize.component';
import { ExcellencePrizeDetailsComponent } from './components/excellence-prize-details/excellence-prize-details.component';
import { ExcellencePrizeParticipantsComponent } from './components/excellence-prize-participants/excellence-prize-participants.component';
import { JudgingPrizeComponent } from './components/judging-prize/judging-prize.component';
import { AddStandardComponent } from './components/add-standard/add-standard.component';
import { ExcellencePrizeReportComponent } from './components/excellence-prize-report/excellence-prize-report.component';
import { AddExcellencePrizeReportComponent } from './components/add-excellence-prize-report/add-excellence-prize-report.component';
import { ExcellenceSectionListComponent } from './components/excellence-section-list/excellence-section-list.component';
import { AddExcellenceSectionComponent } from './components/add-excellence-section/add-excellence-section.component';
import { ExcellenceSectionValuesComponent } from './components/excellence-section-values/excellence-section-values.component';
import { ExcellenceContentValuesComponent } from './components/excellence-content-values/excellence-content-values.component';
import { AddUserToPrizeComponent } from './components/add-user-to-prize/add-user-to-prize.component';
import { PrevExcellencePrizeParticipantsComponent } from './components/prev-excellence-prize-participants/prev-excellence-prize-participants.component';
import { EditStandardComponent } from './components/edit-standard/edit-standard.component';
import { ReadClubListComponent } from './components/read-club-list/read-club-list.component';
import { AddReadClubComponent } from './components/add-read-club/add-read-club.component';
import { ReadClubDetailsComponent } from './components/read-club-details/read-club-details.component';
import { ReadingClubTripsListComponent } from './components/reading-club-trips-list/reading-club-trips-list.component';
import { AddReadingClubTripComponent } from './components/add-reading-club-trip/add-reading-club-trip.component';
import { ReadingClubTripDetailsComponent } from './components/reading-club-trip-details/reading-club-trip-details.component';
import { JudgingReadingClubComponent } from './components/judging-reading-club/judging-reading-club.component';
import { ReadingClubTripParticipantsComponent } from './components/reading-club-trip-participants/reading-club-trip-participants.component';
import { ReadingClubTripHerosComponent } from './components/reading-club-trip-heros/reading-club-trip-heros.component';
import { DisapproveParticipantComponent } from './components/disapprove-participant/disapprove-participant.component';
import { LibraryCategoryListComponent } from './components/library-category-list/library-category-list.component';
import { AddLibraryCategoryComponent } from './components/add-library-category/add-library-category.component';
import { LibraryCategoryBooksListComponent } from './components/library-category-books-list/library-category-books-list.component';
import { AddBookLibraryComponent } from './components/add-book-library/add-book-library.component';
import { EditBookLibraryComponent } from './components/edit-book-library/edit-book-library.component';
import { ExcellencePrizeDisapprovedParticipantsComponent } from './components/excellence-prize-disapproved-participants/excellence-prize-disapproved-participants.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';
import { AddVolunteerComponent } from './components/add-volunteer/add-volunteer.component';
import { VolunteerFieldDetailsComponent } from './components/volunteer-field-details/volunteer-field-details.component';
import { JudgingVolunteerComponent } from './components/judging-volunteer/judging-volunteer.component';
import { AddParticipantVolunteerComponent } from './components/add-participant-volunteer/add-participant-volunteer.component';
import { VolunteerFieldSupervisorComponent } from './components/volunteer-field-supervisor/volunteer-field-supervisor.component';
import { VolunteerFieldDisapprovedComponent } from './components/volunteer-field-disapproved/volunteer-field-disapproved.component';
import { FamilyWritingsListComponent } from './components/family-writings-list/family-writings-list.component';
import { AddFamilyWritingsComponent } from './components/add-family-writings/add-family-writings.component';
import { JudgingPublishersComponent } from './components/judging-publishers/judging-publishers.component';
import { FamilyWritingDetailsComponent } from './components/family-writing-details/family-writing-details.component';
import { AddParticipantClubComponent } from './components/add-participant-club/add-participant-club.component';
import { VolunteerFieldConditionsListComponent } from './components/volunteer-field-conditions-list/volunteer-field-conditions-list.component';
import { AddVolunteerConditionsComponent } from './components/add-volunteer-conditions/add-volunteer-conditions.component';
import { ReadingClubTripBooksComponent } from './components/reading-club-trip-books/reading-club-trip-books.component';
import { AddBookToClubTripComponent } from './components/add-book-to-club-trip/add-book-to-club-trip.component';
import { ApprovedPublicationsComponent } from './components/approved-publications/approved-publications.component';
import { NgxQRCodeModule  } from '@techiediaries/ngx-qrcode';
import { EditQrComponent } from './components/edit-qr/edit-qr.component';
import { EditBookImageComponent } from './components/edit-book-image/edit-book-image.component';
import { SitePhotosListComponent } from './components/site-photos-list/site-photos-list.component';
import { AddSitePhotoComponent } from './components/add-site-photo/add-site-photo.component';
import { StrategicObjectivesListComponent } from './components/strategic-objectives-list/strategic-objectives-list.component';
import { AddStrategicObjectivesComponent } from './components/add-strategic-objectives/add-strategic-objectives.component';
//import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    HomeComponent,
    ActivitiesComponent,
    AddActivityComponent,
    UpdateActivityComponent,
    ActivityTypesComponent,
    AddActivityTypeComponent,
    UpdateActivityTypeComponent,
    LoginComponent,
    UserCategoryShowComponent,
    UserCategoryAddComponent,
      AddWorkTypeComponent,
      EditWorkTypeComponent,
      WorkTypesComponent,
      AddCountryComponent,
      EditCountryComponent,
      CountriesComponent,
      DialogDeleteComponent,
      ProgramsComponent,
      AddProgramComponent,
      CitiesComponent,
      AddCityComponent,
      EditCityComponent,
      DistrictsComponent,
      EditDistrictComponent,
      AddDistrictComponent,
      AddQualificationComponent,
      EditQualificationComponent,
      QualificationsComponent,
      AddDepartmentComponent,
      EditDepartmentComponent,
      DepartmentsComponent,
      SpecializationsComponent,
      EditSpecializationComponent,
      AddSpecializationsComponent,
      DistinguishedTypesComponent,
      AddDistinguishedTypesComponent,
      EditDistinguishedTypesComponent,
      AddFamilyBranchComponent,
      EditFamilyBranchComponent,
      FamilyBranchesComponent,
      DetailsActivityComponent,
      AttachmentsActivityComponent,
      AddAttachmentActivityComponent,
      ImagesActivityComponent,
      VideosActivityComponent,
      AddImagesActivityComponent,
      AddVideoActivityComponent,
      AddReportComponent,
      ContactInformationsComponent,
      AdminsComponent,
      MembersComponent,
      JoinRequestsComponent,
      ConfirmPopUpComponent,
      UserProfilePopUpComponent,
      ParticipantsComponent,
      PostsComponent,
      ContactUsListNewComponent,
      ContactUsListSentComponent,
      ContactUsListNotSentComponent,
      ContactUsAddOrUpdateResponsePopUpComponent,
      SendEmailPopUpComponent,
      AddKafaatFounderComponent,
      EditKafaatFounderComponent,
      KafaatFoundersComponent,
      DocumentedImagesComponent,
      ChangeUserCategoryPopUpComponent,
      TooltipDirective,
      MixPageComponent,
      AddAdminComponent,
      MagazinesComponent,
      MagazinePagesComponent,
      AddMagazineComponent,
      EditMagazineComponent,
      AddMagazinePagesComponent,
      EditMagazinePageComponent,
      ArticleListComponent,
      AddArticleComponent,
      ArticleDetailsComponent,
      WrittingListComponent,
      AddWrittingComponent,
      WrittingDetailsComponent,
      ReadingClubListComponent,
      AddReadingClubComponent,
      ReadingClubDetailsComponent,
      ReadingClubReportListComponent,
      AddReadingClubReportComponent,
      EditMemberComponent,
      AdvancedSearchComponent,
      ReadingClubBooksComponent,
      AddBookComponent,
      EditBookComponent,
      ExcellenceAwardComponent,
      AddExcellenceClubComponent,
      EditExcellenceAwardComponent,
      ExcellenceAwardDetailsComponent,
      AddAwardConditionComponent,
      EditAwardConditionComponent,
      VolunteerComponent,
      VolunteerReportComponent,
      AddVolunteerReportComponent,
      VolunteerFieldListComponent,
      AddVolunteerFieldComponent,
      VolunteerDetailsComponent,
      VolunteerFieldParticipantComponent,
      ChangePasswordMembersComponent,
      RegisterationComponent,
      RequestSendSuccessComponent,
      AllMembersComponent,
      AllMembersDistinguishedComponent,
      EditActivityComponent,
      ExcellenceAwardParticipantComponent,
      PhotoListComponent,
      VideoListComponent,
      AddPhotoComponent,
      AddVideoAlbumComponent,
      AlbumPhotoComponent,
      AddAlbumPhotoComponent,
      AlbumVideoComponent,
      AddAlbumVideoComponent,
      ExcellencePrizeListComponent,
      AddExcellencePrizeComponent,
      ExcellencePrizeDetailsComponent,
      ExcellencePrizeParticipantsComponent,
      JudgingPrizeComponent,
      AddStandardComponent,
      ExcellencePrizeReportComponent,
      AddExcellencePrizeReportComponent,
      ExcellenceSectionListComponent,
      AddExcellenceSectionComponent,
      ExcellenceSectionValuesComponent,
      ExcellenceContentValuesComponent,
      AddUserToPrizeComponent,
      PrevExcellencePrizeParticipantsComponent,
      EditStandardComponent,
      ReadClubListComponent,
      AddReadClubComponent,
      ReadClubDetailsComponent,
      ReadingClubTripsListComponent,
      AddReadingClubTripComponent,
      ReadingClubTripDetailsComponent,
      JudgingReadingClubComponent,
      ReadingClubTripParticipantsComponent,
      ReadingClubTripHerosComponent,
      DisapproveParticipantComponent,
      LibraryCategoryListComponent,
      AddLibraryCategoryComponent,
      LibraryCategoryBooksListComponent,
      AddBookLibraryComponent,
      EditBookLibraryComponent,
      ExcellencePrizeDisapprovedParticipantsComponent,
      VolunteerListComponent,
      AddVolunteerComponent,
      VolunteerFieldDetailsComponent,
      JudgingVolunteerComponent,
      AddParticipantVolunteerComponent,
      VolunteerFieldSupervisorComponent,
      VolunteerFieldDisapprovedComponent,
      FamilyWritingsListComponent,
      AddFamilyWritingsComponent,
      JudgingPublishersComponent,
      FamilyWritingDetailsComponent,
      AddParticipantClubComponent,
      VolunteerFieldConditionsListComponent,
      AddVolunteerConditionsComponent,
      ReadingClubTripBooksComponent,
      AddBookToClubTripComponent,
      ApprovedPublicationsComponent,
      EditQrComponent,
      EditBookImageComponent,
      SitePhotosListComponent,
      AddSitePhotoComponent,
      StrategicObjectivesListComponent,
      AddStrategicObjectivesComponent,
      // AddPostComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    NgxPaginationModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    //KafaatModule,
    NgxQRCodeModule,


    SharedModule,


  ],
  providers:[
    AuthService
  ],

})
export class DashboardModule { }
