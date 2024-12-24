import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ManashetItemComponent } from './components/manashet-item/manashet-item.component';
import { DisplayContentComponent } from './components/display-content/display-content.component';
import { LayoutSectionComponent } from './components/layout-section/layout-section.component';
import { ItemCarousalAngleComponent } from './components/item-carousal-angle/item-carousal-angle.component';
import { NavigationToBackHeaderComponent } from './components/navigation-to-back-header/navigation-to-back-header.component';
import { ImagePopUpComponent } from './components/image-pop-up/image-pop-up.component';
import { VideoPopUpComponent } from './components/video-pop-up/video-pop-up.component';
import { MinshatCarousalComponent } from './components/minshat-carousal/minshat-carousal.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PostsCarousalHomeComponent } from './components/posts-carousal-home/posts-carousal-home.component';
import { MonthFaamousComponent } from './components/month-faamous/month-faamous.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { PageHeaderLabeledComponent } from './components/page-header-labeled/page-header-labeled.component';
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component';
import { ImageThirdComponent } from './components/image-third/image-third.component';
import { PaginationsComponent } from './components/paginations/paginations.component';
import { ScrollNavComponent } from './components/scroll-nav/scroll-nav.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramMinComponent } from './components/program-min/program-min.component';
import { RouterModule } from '@angular/router';
import { DialogVideoImageComponent } from './components/dialog-video-image/dialog-video-image.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnersInterceptor } from './core/Interceptors/spinners.interceptor';
import { CvImagePopupComponent } from './components/cv-image-popup/cv-image-popup.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { MaskedImageComponent } from './components/masked-image/masked-image.component';
import { NavActivitiesComponent } from './components/nav-activities/nav-activities.component';
import { MagazineCartComponent } from './components/magazine-cart/magazine-cart.component';
import { ControllerPdfComponent } from './components/controller-pdf/controller-pdf.component';
import { ScrollMagazineComponent } from './components/scroll-magazine/scroll-magazine.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleHomeDisplayComponent } from './components/article-home-display/article-home-display.component';
import { ClubContentComponent } from './components/club-content/club-content.component';
import { ReadingClubSectionComponent } from './components/reading-club-section/reading-club-section.component';
import { ReadingClubImportanceComponent } from './components/reading-club-importance/reading-club-importance.component';
import { ReadingClubChoosingComponent } from './components/reading-club-choosing/reading-club-choosing.component';
import { ReadingClubDetailsComponent } from './components/reading-club-details/reading-club-details.component';
import { ReadingClubDetailsBooksComponent } from './components/reading-club-details-books/reading-club-details-books.component';
import { ClubDetailsContentComponent } from './components/club-details-content/club-details-content.component';
import { SuccessJoinComponent } from './components/success-join/success-join.component';
import { FilterClubComponent } from './components/filter-club/filter-club.component';
import { ExcellenceProgramComponent } from '../kafaat/components/excellence-program/excellence-program.component';
import { ExcellenceAwardComponent } from './components/excellence-award/excellence-award.component';
import { AwardInfoComponent } from './components/award-info/award-info.component';
import { ExcellenceAwardConditionComponent } from './components/excellence-award-condition/excellence-award-condition.component';
import { JoinAwardComponent } from './components/join-award/join-award.component';
import { ResponseOfJoinComponent } from './components/response-of-join/response-of-join.component';
import { VolunteeringComponent } from './components/volunteering/volunteering.component';
import { VolunteerFieldComponent } from './components/volunteer-field/volunteer-field.component';
import { GetParticipantComponent } from './components/get-participant/get-participant.component';
import { JoinVolunteerComponent } from './components/join-volunteer/join-volunteer.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
import { VideoAlbumComponent } from './components/video-album/video-album.component';
import { AlbumPhotosComponent } from './components/album-photos/album-photos.component';
import { AlbumVideosComponent } from './components/album-videos/album-videos.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    PageHeaderComponent,
    ManashetItemComponent,
    NavigationToBackHeaderComponent,
    ImagePopUpComponent,
    VideoPopUpComponent,
    LayoutSectionComponent,
    ItemCarousalAngleComponent,
    DisplayContentComponent,
    LayoutSectionComponent,
    ItemCarousalAngleComponent,
    NavigationToBackHeaderComponent,
    ImagePopUpComponent,
    VideoPopUpComponent,
    MinshatCarousalComponent,
    PostsCarousalHomeComponent,
    MonthFaamousComponent,
    FormContactComponent,
    TabsContainerComponent,
    ImageThirdComponent,
    PageHeaderLabeledComponent,
    TabsContainerComponent,
    PaginationsComponent,
    ScrollNavComponent,
    DatePickerComponent,
    ProgramMinComponent,
    DialogVideoImageComponent,
    SpinnerComponent,
    CvImagePopupComponent,
    EmptyDataComponent,
    MaskedImageComponent,
    NavActivitiesComponent,
    MagazineCartComponent,
    ControllerPdfComponent,
    ScrollMagazineComponent,
    ArticleCardComponent,
    ArticleHomeDisplayComponent,
    ClubContentComponent,
    ReadingClubSectionComponent,
    ReadingClubImportanceComponent,
    ReadingClubChoosingComponent,
    ReadingClubDetailsComponent,
    ReadingClubDetailsBooksComponent,
    ClubDetailsContentComponent,
    SuccessJoinComponent,
    FilterClubComponent,
    ExcellenceProgramComponent,
    ExcellenceAwardComponent,
    AwardInfoComponent,
    ExcellenceAwardConditionComponent,
    JoinAwardComponent,
    ResponseOfJoinComponent,
    VolunteeringComponent,
    VolunteerFieldComponent,
    GetParticipantComponent,
    JoinVolunteerComponent,
    PhotoAlbumComponent,
    VideoAlbumComponent,
    AlbumPhotosComponent,
    AlbumVideosComponent,
    AlbumCardComponent

  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // ClubContentComponent

  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    PageHeaderComponent,
    ManashetItemComponent,
    NavigationToBackHeaderComponent,
    ImagePopUpComponent,
    LayoutSectionComponent,
    ItemCarousalAngleComponent,
    LayoutSectionComponent,
    ItemCarousalAngleComponent,
    NavigationToBackHeaderComponent,
    ImagePopUpComponent,
    MinshatCarousalComponent,
    PostsCarousalHomeComponent,
    MonthFaamousComponent,
    TabsContainerComponent,
    ImageThirdComponent,
    PageHeaderLabeledComponent,
    TabsContainerComponent,
    PaginationsComponent,
    ScrollNavComponent,
    DatePickerComponent,
    ProgramMinComponent,
    DialogVideoImageComponent,
    SpinnerComponent,
    CvImagePopupComponent,
    EmptyDataComponent,
    MaskedImageComponent,
    NavActivitiesComponent,
    MagazineCartComponent,
    ControllerPdfComponent,
    ScrollMagazineComponent,
    ArticleCardComponent,
    // ClubContentComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnersInterceptor,
      multi: true
    }
  ],
})
export class SharedModule { }
