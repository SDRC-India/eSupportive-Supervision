/*
 * @Author: Ratikanta Pradhan
 * @email:   ratikanta@sdrc.co.in
 * @Date: 2017-10-16 15:24:56
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2017-12-01 14:32:16
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { MessageProvider } from '../providers/message/message';
import { MonthdataPipe } from '../pipes/monthdata/monthdata';
import { HttpModule } from '@angular/http';
import { AreaPipe } from '../pipes/area/area';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureModalPage } from '../pages/signature-modal/signature-modal';
import { EditFormPage } from '../pages/edit-form/edit-form';
import { FacilityPage } from '../pages/facility/facility';
import { CommunityPage } from '../pages/community/community';
import { FinalizeFormPage } from '../pages/finalize-form/finalize-form';
import { ViewsentPage } from '../pages/viewsent/viewsent';
import { PrefetchDataPage } from '../pages/prefetch-data/prefetch-data';
import { FacilitiesModalPage } from '../pages/facilities-modal/facilities-modal';
import { DatePipe} from '@angular/common';
import { ValidationProvider } from '../providers/validation/validation';
import { Camera } from '@ionic-native/camera';
import { NegativeinputProvider } from '../providers/negativeinput/negativeinput';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { TxndataPipe } from '../pipes/txndata/txndata';
import { HintProvider } from '../providers/hint/hint';
import { HintModalPage } from '../pages/hint-modal/hint-modal';
import { FacilitylevelPipe } from '../pipes/facilitylevel/facilitylevel';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { File } from '@ionic-native/file'
import { AppVersion } from '@ionic-native/app-version'
import { EssProvider } from '../providers/ess/ess';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { CommunityProgressBarComponent } from '../components/community-progress-bar/community-progress-bar';
import { FilterByIdPipe } from '../pipes/filter-by-id/filter-by-id';
import { FilterBySectionIdCommunityPipe } from '../pipes/filter-by-section-id-community/filter-by-section-id-community';
import { HideHeaderCommunityDirective } from '../directives/hide-header-community/hide-header-community';
import { HideHeaderDirective } from '../directives/hide-header/hide-header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MonthdataPipe,
    AreaPipe,
    TxndataPipe,
    FacilitylevelPipe,
    HideHeaderCommunityDirective,
    LoginPage,
    SignatureModalPage,
    FacilityPage,
    CommunityPage,
    EditFormPage,
    FinalizeFormPage,
    ViewsentPage,
    PrefetchDataPage,
    FacilitiesModalPage,
    ProgressBarComponent,
    CommunityProgressBarComponent,
    HintModalPage,
    FilterByIdPipe,
    FilterBySectionIdCommunityPipe,
    HideHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    Ng2OrderModule,
    IonicModule.forRoot(MyApp, {
        platforms: {
            ios: {
                scrollAssist: false,    // Valid options appear to be [true, false]
                autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
            },
            android: {
                scrollAssist: true,    // Valid options appear to be [true, false]
                autoFocusAssist: true  // Valid options appear to be ['instant', 'delay', false]
            }
        }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignatureModalPage,
    FacilityPage,
    CommunityPage,
    EditFormPage,
    FinalizeFormPage,
    ViewsentPage,
    PrefetchDataPage,
    FacilitiesModalPage,
    HintModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    MessageProvider,
    MonthdataPipe,
    TxndataPipe,
    ValidationProvider,
    DatePipe,
    Camera,
    AreaPipe,
    NegativeinputProvider,
    NegativeinputProvider,
    Geolocation,
    HintProvider,
    FacilitylevelPipe,
    BackgroundGeolocation,
    File,
    AppVersion,
    EssProvider
  ]
})
export class AppModule {}
