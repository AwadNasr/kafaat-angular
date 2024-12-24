import { LibraryCategoryBooksListComponent } from './components/library-category-books-list/library-category-books-list.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { VolunteerReportComponent } from './components/volunteer-report/volunteer-report.component';
import { ReadingClubDetailsComponent } from './components/ReadingClub/reading-club-details/reading-club-details.component';
//import { ReadingClubDetailsComponent } from './../shared/components/reading-club-details/reading-club-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { UpdateActivityTypeComponent } from './components/update-activity-type/update-activity-type.component';
import { AddActivityTypeComponent } from './components/add-activity-type/add-activity-type.component';
import { ActivityTypesComponent } from './components/activity-types/activity-types.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserCategoryShowComponent } from './components/user-category-show/user-category-show.component';
import { UserCategoryAddComponent } from './components/user-category-add/user-category-add.component';
import { EditWorkTypeComponent } from './components/edit-work-type/edit-work-type.component';
import { AddWorkTypeComponent } from './components/add-work-type/add-work-type.component';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { CountriesComponent } from './components/countries/countries.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { CitiesComponent } from './components/cities/cities.component';
import { DistrictsComponent } from './components/districts/districts.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { SpecializationsComponent } from './components/specializations/specializations.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DistinguishedTypesComponent } from './components/distinguished-types/distinguished-types.component';
import { FamilyBranchesComponent } from './components/family-branches/family-branches.component';
import { DetailsActivityComponent } from './components/details-activity/details-activity.component';
import { AttachmentsActivityComponent } from './components/attachments-activity/attachments-activity.component';
import { ImagesActivityComponent } from './components/images-activity/images-activity.component';
import { VideosActivityComponent } from './components/videos-activity/videos-activity.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ContactInformationsComponent } from './components/contact-informations/contact-informations.component';
import { AdminsComponent } from './components/admins/admins.component';
import { MembersComponent } from './components/members/members.component';
import { JoinRequestsComponent } from './components/join-requests/join-requests.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PostsComponent } from './components/posts/posts.component';
import { ContactUsListNewComponent } from './components/contact-us-list-new/contact-us-list-new.component';
import { ContactUsListSentComponent } from './components/contact-us-list-sent/contact-us-list-sent.component';
import { ContactUsListNotSentComponent } from './components/contact-us-list-not-sent/contact-us-list-not-sent.component';
import { KafaatFoundersComponent } from './components/kafaat-founders/kafaat-founders.component';
import { DocumentedImagesComponent } from './components/documented-images/documented-images.component';
import { MixPageComponent } from './components/mix-page/mix-page.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { MagazinePagesComponent } from './components/magazine-pages/magazine-pages.component';
import { AddMagazinePagesComponent } from './components/add-magazine-pages/add-magazine-pages.component';
import { ArticleListComponent } from './components/Articles/article-list/article-list.component';
import { AddArticleComponent } from './components/Articles/add-article/add-article.component';
import { WrittingListComponent } from './components/Writtings/writting-list/writting-list.component';
import { AddWrittingComponent } from './components/Writtings/add-writting/add-writting.component';
import { ReadingClubComponent } from '../kafaat/components/ReadingClub/reading-club/reading-club.component';
import { ReadingClubListComponent } from './components/ReadingClub/reading-club-list/reading-club-list.component';
import { AddReadingClubComponent } from './components/ReadingClub/add-reading-club/add-reading-club.component';
import { ReadingClubReportListComponent } from './components/ReadingClubReport/reading-club-report-list/reading-club-report-list.component';
import { AddReadingClubReportComponent } from './components/ReadingClubReport/add-reading-club-report/add-reading-club-report.component';
import { ReadingClubBooksComponent } from './components/reading-club-books/reading-club-books.component';
import { ReadingClubDetailsBooksComponent } from '../shared/components/reading-club-details-books/reading-club-details-books.component';
import { ExcellenceAwardComponent } from './components/excellence-award/excellence-award.component';
import { ExcellenceAwardDetailsComponent } from './components/excellence-award-details/excellence-award-details.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { VolunteerFieldListComponent } from './components/volunteer-field-list/volunteer-field-list.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { VolunteerFieldParticipantComponent } from './components/volunteer-field-participant/volunteer-field-participant.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { RequestSendSuccessComponent } from './components/request-send-success/request-send-success.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { AllMembersDistinguishedComponent } from './components/all-members-distinguished/all-members-distinguished.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { ExcellenceAwardParticipantComponent } from './components/excellence-award-participant/excellence-award-participant.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { VideoListComponent } from './video-list/video-list.component';
import { AlbumPhotoComponent } from './components/album-photo/album-photo.component';
import { AlbumVideoComponent } from './components/album-video/album-video.component';
import { ExcellencePrizeListComponent } from './components/excellence-prize-list/excellence-prize-list.component';
import { ExcellencePrizeDetailsComponent } from './components/excellence-prize-details/excellence-prize-details.component';
import { ExcellencePrizeParticipantsComponent } from './components/excellence-prize-participants/excellence-prize-participants.component';
import { JudgingPrizeComponent } from './components/judging-prize/judging-prize.component';
import { ExcellencePrizeReportComponent } from './components/excellence-prize-report/excellence-prize-report.component';
import { ExcellenceSectionListComponent } from './components/excellence-section-list/excellence-section-list.component';
import { ExcellenceSectionValuesComponent } from './components/excellence-section-values/excellence-section-values.component';
import { PrevExcellencePrizeParticipantsComponent } from './components/prev-excellence-prize-participants/prev-excellence-prize-participants.component';
import { ReadClubListComponent } from './components/read-club-list/read-club-list.component';
import { ReadClubDetailsComponent } from './components/read-club-details/read-club-details.component';
import { ReadingClubTripsListComponent } from './components/reading-club-trips-list/reading-club-trips-list.component';
import { ReadingClubTripDetailsComponent } from './components/reading-club-trip-details/reading-club-trip-details.component';
import { JudgingReadingClubComponent } from './components/judging-reading-club/judging-reading-club.component';
import { ReadingClubTripParticipantsComponent } from './components/reading-club-trip-participants/reading-club-trip-participants.component';
import { ReadingClubTripHerosComponent } from './components/reading-club-trip-heros/reading-club-trip-heros.component';
import { LibraryCategoryListComponent } from './components/library-category-list/library-category-list.component';
import { ExcellencePrizeDisapprovedParticipantsComponent } from './components/excellence-prize-disapproved-participants/excellence-prize-disapproved-participants.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';
import { VolunteerFieldDetailsComponent } from './components/volunteer-field-details/volunteer-field-details.component';
import { JudgingVolunteerComponent } from './components/judging-volunteer/judging-volunteer.component';
import { VolunteerFieldSupervisorComponent } from './components/volunteer-field-supervisor/volunteer-field-supervisor.component';
import { VolunteerFieldDisapprovedComponent } from './components/volunteer-field-disapproved/volunteer-field-disapproved.component';
import { FamilyWritingsListComponent } from './components/family-writings-list/family-writings-list.component';
import { FamilyWritingDetailsComponent } from './components/family-writing-details/family-writing-details.component';
import { JudgingPublishersComponent } from './components/judging-publishers/judging-publishers.component';
import { VolunteerFieldConditionsListComponent } from './components/volunteer-field-conditions-list/volunteer-field-conditions-list.component';
import { ReadingClubTripBooksComponent } from './components/reading-club-trip-books/reading-club-trip-books.component';
import { ApprovedPublicationsComponent } from './components/approved-publications/approved-publications.component';
import { SitePhotosListComponent } from './components/site-photos-list/site-photos-list.component';
import { StrategicObjectivesListComponent } from './components/strategic-objectives-list/strategic-objectives-list.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'activities',component:ActivitiesComponent},
  {path:'registeration',component:RegisterationComponent},
 {path:'request-send-success',component:RequestSendSuccessComponent},
 {path:'AllMembers/:id',component:AllMembersComponent},
 {path:'excellence-participants/:id',component:ExcellenceAwardParticipantComponent},
 {path:'AllDistinguished',component:AllMembersDistinguishedComponent},
  {path:'details-activity/:id',component:DetailsActivityComponent},
  {path:'images-activity/:id',component:ImagesActivityComponent},
  {path:'report-activity/:id',component:AddReportComponent},
  {path:'videos-activity/:id',component:VideosActivityComponent},
  {path:'participants/:id',component:ParticipantsComponent},
  {path:'posts/:id',component:PostsComponent},
  {path:'attachments-activity/:id',component:AttachmentsActivityComponent},
  {path:'edit-activity/:id',component:EditActivityComponent},
  {path:'add-activity',component:AddActivityComponent},
  {path:'update-activity/:id',component:UpdateActivityComponent},
  {path:'user-category-show',component:UserCategoryShowComponent},
  {path:'user-category-add',component:UserCategoryAddComponent},
  {path:'programs',component:ProgramsComponent},
  {path:'types-activity',component:ActivityTypesComponent},
  {path:'add-activityType',component:AddActivityTypeComponent},
  {path:'update-activityType/:id',component:UpdateActivityTypeComponent},
  {path:'update-work-type/:id',component:EditWorkTypeComponent},
  {path:'add-work-type',component:AddWorkTypeComponent},
  {path:'work-types',component:WorkTypesComponent},
  {path:'update-country/:id',component:EditCountryComponent},
  {path:'add-country',component:AddCountryComponent},
  {path:'countries',component:CountriesComponent},
  {path:'countries',component:CountriesComponent},
  {path:'cities',component:CitiesComponent},
  {path:'districts',component:DistrictsComponent},

  {path:'qualifications',component:QualificationsComponent},
  {path:'specializations',component:SpecializationsComponent},
  {path:'departments',component:DepartmentsComponent},

  {path:'workTypes',component:WorkTypesComponent},
  {path:'distinguishedTypes',component:DistinguishedTypesComponent},
  {path:'familyBranches',component:FamilyBranchesComponent},

  {path:'contactInformation',component:ContactInformationsComponent},

  {path:'admins',component:AdminsComponent},
  {path:'members',component:MembersComponent},
  {path:'join-requests',component:JoinRequestsComponent},

  {path:'contact-us-list-new',component:ContactUsListNewComponent},
  {path:'contact-us-list-sent',component:ContactUsListSentComponent},
  {path:'contact-us-list-not-sent',component:ContactUsListNotSentComponent},

  {path:'kafaat-founders',component:KafaatFoundersComponent},
  {path:'documented-images',component:DocumentedImagesComponent},

  {path:'mix-page',component:MixPageComponent},

  {path:'magazines',component:MagazinesComponent},
  {path:'magazine-details/:id',component:MagazinePagesComponent},
  {path:'add-magazine-pages/:id',component:AddMagazinePagesComponent},

  // articles
  {path:'articles',component:ArticleListComponent},
  {path:'add-article',component:AddArticleComponent},

  // writtings
  {path:'writtings', component:WrittingListComponent},
  {path:'add-writting',component:AddWrittingComponent},

  // Reading-Club
  {path:'clubs', component:ReadingClubListComponent},
  {path:'add-club',component:AddReadingClubComponent},
  {path:'club-details/:id',component:ReadingClubDetailsComponent},

  // Reading-Club-Report
  {path:'club-Report', component:ReadingClubReportListComponent},
  {path:'add-club-report',component:AddReadingClubReportComponent},

  // Reading-Club-Book
  {path:'club-books/:id',component:ReadingClubBooksComponent},

  //Excellence Award
  {path:'excellence-award', component:ExcellenceAwardComponent},
  {path:'excellence-awardDetails/:id',component:ExcellenceAwardDetailsComponent},

  //Volunteer
  {path:'volunteer-field-list/:id', component:VolunteerFieldListComponent},
  {path:'volunteer-report/:id', component:VolunteerReportComponent},
  {path:'volunteer-details/:id',component:VolunteerDetailsComponent},
  {path:'volunteer-field-details/:id',component:VolunteerFieldDetailsComponent},
  {path:'volunteer-field-participant/:id',component:VolunteerFieldParticipantComponent},
  {path:'volunteer-field-disapproved/:id',component:VolunteerFieldDisapprovedComponent},
  {path:'volunteer-field-supervisor/:id',component:VolunteerFieldSupervisorComponent},
  {path:'volunteer-list', component:VolunteerListComponent},
  {path:'judging-volunteer/:id',component:JudgingVolunteerComponent},
  {path:'volunteer-field-conditions/:id',component:VolunteerFieldConditionsListComponent},


  //Photos&videos
  {path:'photos', component:PhotoListComponent},
  {path:'videos', component:VideoListComponent},
  {path:'album-photos/:id', component:AlbumPhotoComponent},
  {path:'album-videos/:id', component:AlbumVideoComponent},

  //ExcellencePrize
  {path:'excellence-prize', component:ExcellencePrizeListComponent},
  {path:'excellence-prize-details/:id', component:ExcellencePrizeDetailsComponent},
  {path:'excellence-prize-participants/:id', component:ExcellencePrizeParticipantsComponent},
  {path:'excellence-prize-disapproved-participants/:id', component:ExcellencePrizeDisapprovedParticipantsComponent},
  {path:'prev-excellence-prize-participants/:id', component:PrevExcellencePrizeParticipantsComponent},
  {path:'prize-judging/:id', component:JudgingPrizeComponent},
  {path:'excellence-prize-report/:id', component:ExcellencePrizeReportComponent},
  {path:'excellence-prize-section/:id', component:ExcellenceSectionListComponent},
  {path:'excellence-content-values/:id', component:ExcellenceSectionValuesComponent},
  {path:'read-club-list', component:ReadClubListComponent},
  {path:'read-club-details/:id', component:ReadClubDetailsComponent},
  {path:'reading-club-trips/:id', component:ReadingClubTripsListComponent},
  {path:'reading-club-trip-details/:id', component:ReadingClubTripDetailsComponent},
  {path:'judging-reading-club/:id', component:JudgingReadingClubComponent},
  {path:'reading-club-trip-participants/:id', component:ReadingClubTripParticipantsComponent},
  {path:'reading-club-trip-heros/:id', component:ReadingClubTripHerosComponent},
  {path:'reading-club-trip-books/:id', component:ReadingClubTripBooksComponent},
  {path:'library-category-list', component:LibraryCategoryListComponent},
  {path:'library-category-books/:id', component:LibraryCategoryBooksListComponent},
  {path:'site-photos-list', component:SitePhotosListComponent},
  {path:'family-writings-list', component:FamilyWritingsListComponent},
  {path:'family-writing-details/:id', component:FamilyWritingDetailsComponent},
  {path:'family-writing-publishers/:id', component:JudgingPublishersComponent},
  {path:'approved-publications/:id', component:ApprovedPublicationsComponent},
  {path:'strategic-objectives', component:StrategicObjectivesListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DashboardRoutingModule { }
