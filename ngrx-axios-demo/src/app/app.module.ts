import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NguoidungListComponent } from './components/nguoidung-list/nguoidung-list.component';
import { nguoidungReducer } from './store-nguoidung/nguoidung.reducer';
import { NguoidungEffects } from './store-nguoidung/nguoidung.effects';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SassComponent } from './components/sass/sass.component';
import { bangluongReducer } from './store-bangluong/salary.reducer';
import { BangluongEffects } from './store-bangluong/salary.effects';
import { BangluongListComponent } from './components/bangluong-list/bangluong-list.component';
import { phongbanReducer } from './store-phongban/phongban.reducer';
import { PhongbanListComponent } from './components/phongban-list/phongban-list.component';
import { PhongbanEffects } from './store-phongban/phongban.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
@NgModule({
  declarations: [
    AppComponent,
    NguoidungListComponent,
    MenuComponent,
    HomeComponent,
    SassComponent,
    BangluongListComponent,
    PhongbanListComponent,
    SidemenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgApexchartsModule,
    StoreModule.forRoot({
      nguoidung: nguoidungReducer,
      bangluong: bangluongReducer,
      phongban: phongbanReducer,
    }),

    // Khai báo EffectsModule
    EffectsModule.forRoot([
      NguoidungEffects,
      BangluongEffects,
      PhongbanEffects,
    ]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
