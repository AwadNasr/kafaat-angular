import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KafaatRoutingModule } from './kafaat-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { MusharakatItemComponent } from './components/musharakat-item/musharakat-item.component';
import { ManshatDetailsComponent } from './components/manshat-details/manshat-details.component';
import { ManashetDetailsReportPageComponent } from './components/manashet-details-report-page/manashet-details-report-page.component';
import { ManashetDetailsAttachmentPageComponent } from './components/manashet-details-attachment-page/manashet-details-attachment-page.component';
import { ManashetDetailsImageGalleryPageComponent } from './components/manashet-details-image-gallery-page/manashet-details-image-gallery-page.component';
import { ManashetDetailsVideoGalleryPageComponent } from './components/manashet-details-video-gallery-page/manashet-details-video-gallery-page.component';
import { ManashetDetailsSharedPageComponent } from './components/manashet-details-shared-page/manashet-details-shared-page.component';
import { ManashetDetailsDistinguishedPageComponent } from './components/manashet-details-distinguished-page/manashet-details-distinguished-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarousalHomeComponent } from './components/carousal-home/carousal-home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { DiscoverProgramsComponent } from './components/discover-programs/discover-programs.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ManshatDetailsInProgressComponent } from './components/manshat-details-in-progress/manshat-details-in-progress.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { WinnerComponent } from './components/winner/winner.component';
import { PostsSlidesComponent } from './components/posts-slides/posts-slides.component';
import { LoginComponent } from './components/login/login.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { CodeAuthComponent } from './components/code-auth/code-auth.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { ProfileAccountInformationComponent } from './components/profile-account-information/profile-account-information.component';
import { ProfileManashetComponent } from './components/profile-manashet/profile-manashet.component';
import { ProfilePaymentComponent } from './components/profile-payment/profile-payment.component';
import { ProfileMusharakatComponent } from './components/profile-musharakat/profile-musharakat.component';
import { ProfileAchievementsComponent } from './components/profile-achievements/profile-achievements.component';
import { ProfileLogoutComponent } from './components/profile-logout/profile-logout.component';
import { ProfileDeleteAccountComponent } from './components/profile-delete-account/profile-delete-account.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { ProfileLogoutPopUpComponent } from './components/profile-logout-pop-up/profile-logout-pop-up.component';
import { ProfileDeleteAccountPopUpComponent } from './components/profile-delete-account-pop-up/profile-delete-account-pop-up.component';
import { PasswordMaskDirective } from './core/directives/password-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArabicDigitsDirective } from './core/directives/arabic-digits.directive';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { RouterModule } from '@angular/router';
import { NgxQRCodeModule  } from '@techiediaries/ngx-qrcode';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { RegisterationSucceededComponent } from './components/registeration-succeeded/registeration-succeeded.component';
import { ManashetTabsComponent } from './components/manashet-tabs/manashet-tabs.component';
import { GoalsKafaatComponent } from './components/goals-kafaat/goals-kafaat.component';
import { PostsPeopleComponent } from './components/posts-people/posts-people.component';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';
import { AuthSharedService } from './services/auth-shared.service';
import { PdfPopupComponent } from './components/pdf-popup/pdf-popup.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { DateOfHegiraComponent } from './components/date-of-hegira/date-of-hegira.component';
import { DateOfBirthComponent } from './components/date-of-birth/date-of-birth.component';
import { PdfViewrComponent } from './components/pdf-viewr/pdf-viewr.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderDeviceComponent } from './components/header-device/header-device.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { MagazinePageComponent } from './components/magazine-page/magazine-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ReadingClubComponent } from './components/ReadingClub/reading-club/reading-club.component';
import { JoinClubComponent } from './components/join-club/join-club.component';
import { ClubDetailsComponent } from './components/club-details/club-details.component';
import { ExcellencePrizeComponent } from './components/excellence-prize/excellence-prize.component';
import { JoinExcellencePrizeComponent } from './components/join-excellence-prize/join-excellence-prize.component';
import { ExcellencePrizeWinnersComponent } from './components/excellence-prize-winners/excellence-prize-winners.component';
import { ExcellenceConditionsComponent } from './components/excellence-conditions/excellence-conditions.component';
import { ReadClubComponent } from './components/read-club/read-club.component';
import { StaticReadingClubComponent } from './components/static-reading-club/static-reading-club.component';
import { JoinReadClubComponent } from './components/join-read-club/join-read-club.component';
import { ReadClubDetailsComponent } from './components/read-club-details/read-club-details.component';
import { ReadClubTripDetailsComponent } from './components/read-club-trip-details/read-club-trip-details.component';
import { ReadingClubLibraryComponent } from './components/reading-club-library/reading-club-library.component';
import { ReadingClubLibraryDetailsComponent } from './components/reading-club-library-details/reading-club-library-details.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { VolunteerFieldsComponent } from './components/volunteer-fields/volunteer-fields.component';
import { JoinVolunteerFieldComponent } from './components/join-volunteer-field/join-volunteer-field.component';
import { VolunteerFieldParticipantsComponent } from './components/volunteer-field-participants/volunteer-field-participants.component';
import { VolunteerFieldHerosComponent } from './components/volunteer-field-heros/volunteer-field-heros.component';
import { FamilyWritingsComponent } from './components/family-writings/family-writings.component';
import { JoinFamilyWritingsComponent } from './components/join-family-writings/join-family-writings.component';
import { FamilyWritingsDetailsComponent } from './components/family-writings-details/family-writings-details.component';
// import { ClubContentComponent } from '../shared/components/club-content/club-content.component';
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    PasswordMaskDirective,
    ArabicDigitsDirective,
    ProgramDetailsComponent,
    MusharakatItemComponent,
    ManshatDetailsComponent,
    ManashetDetailsReportPageComponent,
    ManashetDetailsAttachmentPageComponent,
    ManashetDetailsImageGalleryPageComponent,
    ManashetDetailsVideoGalleryPageComponent,
    ManashetDetailsSharedPageComponent,
    ManashetDetailsDistinguishedPageComponent,
    HomePageComponent,
    CarousalHomeComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    DiscoverProgramsComponent,
    AboutPageComponent,
    ManshatDetailsInProgressComponent,
    ContactUsComponent,
    WinnerComponent,
    PostsSlidesComponent,
    LoginComponent,
    ForgottenPasswordComponent,
    CodeAuthComponent,
    NewPasswordComponent,
    ProfileLayoutComponent,
    ProfileAccountInformationComponent,
    ProfileManashetComponent,
    ProfilePaymentComponent,
    ProfileMusharakatComponent,
    ProfileAchievementsComponent,
    ProfileLogoutComponent,
    ProfileDeleteAccountComponent,
    ProfileChangePasswordComponent,
    ProfileLogoutPopUpComponent,
    ProfileDeleteAccountPopUpComponent,
    WinnerComponent,
    PostsSlidesComponent,
    PasswordMaskDirective,
    ArabicDigitsDirective,
    AllProgramsComponent,
    RegisterationComponent,
    RegisterationSucceededComponent,
    ManashetTabsComponent,
    GoalsKafaatComponent,
    PostsPeopleComponent,
    DateOfHegiraComponent,
    DateOfBirthComponent,
    PdfViewrComponent,
    HeaderComponent,
    HeaderDeviceComponent,
    MagazineComponent,
    MagazinePageComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    ReadingClubComponent,
    JoinClubComponent,
    ClubDetailsComponent,
    ExcellencePrizeComponent,
    JoinExcellencePrizeComponent,
    ExcellencePrizeWinnersComponent,
    ExcellenceConditionsComponent,
    ReadClubComponent,
    StaticReadingClubComponent,
    JoinReadClubComponent,
    ReadClubDetailsComponent,
    ReadClubTripDetailsComponent,
    ReadingClubLibraryComponent,
    ReadingClubLibraryDetailsComponent,
    VolunteerComponent,
    VolunteerDetailsComponent,
    VolunteerFieldsComponent,
    JoinVolunteerFieldComponent,
    VolunteerFieldParticipantsComponent,
    VolunteerFieldHerosComponent,
    FamilyWritingsComponent,
    JoinFamilyWritingsComponent,
    FamilyWritingsDetailsComponent,
    // ClubContentComponent
  ],
  imports: [
    CommonModule,
    KafaatRoutingModule,
    SharedModule,
    SlickCarouselModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatInputModule,
    MatInputModule ,
    NgxQRCodeModule,
    // BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [AuthSharedService,
 ],

})
export class KafaatModule { }
