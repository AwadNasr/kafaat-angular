import { FamilyWritingsComponent } from './components/family-writings/family-writings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { BreadCrumbComponent } from '../shared/components/bread-crumb/bread-crumb.component';
import { ManshatDetailsComponent } from './components/manshat-details/manshat-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { ManshatDetailsInProgressComponent } from './components/manshat-details-in-progress/manshat-details-in-progress.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { WinnerComponent } from './components/winner/winner.component';
import { PostsSlidesComponent } from './components/posts-slides/posts-slides.component';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { PostsPeopleComponent } from './components/posts-people/posts-people.component';
import { MemberGuard } from '../dashboard/core/guards/member.guard';
import { PdfPopupComponent } from './components/pdf-popup/pdf-popup.component';
import { RegisterationSucceededComponent } from './components/registeration-succeeded/registeration-succeeded.component';
import { MaskedImageComponent } from '../shared/components/masked-image/masked-image.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { MagazinePageComponent } from './components/magazine-page/magazine-page.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ReadingClubComponent } from './components/ReadingClub/reading-club/reading-club.component';
import { ReadingClubDetailsBooksComponent } from '../shared/components/reading-club-details-books/reading-club-details-books.component';
import { SuccessJoinComponent } from '../shared/components/success-join/success-join.component';
import { ExcellenceProgramComponent } from './components/excellence-program/excellence-program.component';
import { VolunteeringComponent } from '../shared/components/volunteering/volunteering.component';
import { VolunteerFieldComponent } from '../shared/components/volunteer-field/volunteer-field.component';
import { GetParticipantComponent } from '../shared/components/get-participant/get-participant.component';
import { ExcellencePrizeComponent } from './components/excellence-prize/excellence-prize.component';
import { ExcellencePrizeWinnersComponent } from './components/excellence-prize-winners/excellence-prize-winners.component';
import { PhotoAlbumComponent } from '../shared/components/photo-album/photo-album.component';
import { VideoAlbumComponent } from '../shared/components/video-album/video-album.component';
import { AlbumPhotosComponent } from '../shared/components/album-photos/album-photos.component';
import { AlbumVideosComponent } from '../shared/components/album-videos/album-videos.component';
import { ExcellenceConditionsComponent } from './components/excellence-conditions/excellence-conditions.component';
import { ReadClubComponent } from './components/read-club/read-club.component';
import { StaticReadingClubComponent } from './components/static-reading-club/static-reading-club.component';
import { ReadClubDetailsComponent } from './components/read-club-details/read-club-details.component';
import { ReadClubTripDetailsComponent } from './components/read-club-trip-details/read-club-trip-details.component';
import { ReadingClubLibraryComponent } from './components/reading-club-library/reading-club-library.component';
import { ReadingClubLibraryDetailsComponent } from './components/reading-club-library-details/reading-club-library-details.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { VolunteerFieldsComponent } from './components/volunteer-fields/volunteer-fields.component';
import { VolunteerFieldParticipantComponent } from '../dashboard/components/volunteer-field-participant/volunteer-field-participant.component';
import { VolunteerFieldParticipantsComponent } from './components/volunteer-field-participants/volunteer-field-participants.component';
import { VolunteerFieldHerosComponent } from './components/volunteer-field-heros/volunteer-field-heros.component';
import { FamilyWritingDetailsComponent } from '../dashboard/components/family-writing-details/family-writing-details.component';
import { FamilyWritingsDetailsComponent } from './components/family-writings-details/family-writings-details.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'program-details/:id',component:ProgramDetailsComponent},
  {path:'activity-details/:id',component:ManshatDetailsComponent},
  {path:'magazine/:id',component:MagazinePageComponent},
  {path:'',component:HomePageComponent,},
  {path:'program-details',component:ProgramDetailsComponent},
  {path:'event-details',component:ManshatDetailsComponent},
  {path:'event-details-in-progress',component:ManshatDetailsInProgressComponent},
  {path:'breadcrumb',component:BreadCrumbComponent},
  {path:'about',component:AboutPageComponent},
  {path:'',component:HomePageComponent},
  {path:'payment',component:PaymentComponent},
  {path:'payment-success',component:PaymentSuccessComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'profile',component:ProfileLayoutComponent,canActivate:[MemberGuard]},
  {path:'winners',component:WinnerComponent},
  {path:'famous-posts',component:PostsSlidesComponent},
  {path:'post-people',component:PostsPeopleComponent},
  {path:'profile',component:ProfileLayoutComponent},
  {path:'programs',component:AllProgramsComponent},
  {path:'request-send-success',component:RegisterationSucceededComponent},
  {path:'pdf',component:PdfPopupComponent},
  {path:'mask',component:MaskedImageComponent},
  {path:'magazine',component:MagazineComponent},
  {path:'articles',component:ArticlesComponent},
  {path:'article-details/:id',component:ArticleDetailsComponent},
  {path:'club-detailsBook/:id',component:ReadingClubDetailsBooksComponent},
  {path:'readingClub',component:ReadingClubComponent},
  {path:'excellenceProgram',component:ExcellenceProgramComponent},
  {path:'volunteering',component:VolunteeringComponent},
  {path:'volunteer-field/:id',component:VolunteerFieldComponent},
  {path:'volunteer-participant/:userId/:id',component:GetParticipantComponent},
  {path:'excellence-prize',component:ExcellencePrizeComponent},
  {path:'excellence-prize/:id',component:ExcellencePrizeComponent},
  {path:'excellence-prize-winners/:id',component:ExcellencePrizeWinnersComponent},
  {path:'excellence-prize-conditions/:id',component:ExcellenceConditionsComponent},
  {path:'photo-album',component:PhotoAlbumComponent},
  {path:'video-album',component:VideoAlbumComponent},
  {path:'album-photos/:id',component:AlbumPhotosComponent},
  {path:'album-videos/:id',component:AlbumVideosComponent},
  {path:'read-club',component:ReadClubComponent},
  {path:'reading-club',component:StaticReadingClubComponent},
  {path:'reading-club-details/:id',component:ReadClubDetailsComponent},
  {path:'reading-club-trip/:id',component:ReadClubTripDetailsComponent},
  {path:'reading-club-library',component:ReadingClubLibraryComponent},
  {path:'book-details/:id',component:ReadingClubLibraryDetailsComponent},
  {path:'volunteer',component:VolunteerComponent},
  {path:'volunteer/:id',component:VolunteerComponent},
  {path:'volunteer-details/:id',component:VolunteerDetailsComponent},
  {path:'volunteer-fields/:id',component:VolunteerFieldsComponent},
  {path:'volunteer-field-participants/:id',component:VolunteerFieldParticipantsComponent},
  {path:'volunteer-field-heros/:id',component:VolunteerFieldHerosComponent},
  {path:'family-writings',component:FamilyWritingsComponent},
  {path:'family-writings-details/:id',component:FamilyWritingsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KafaatRoutingModule { }
