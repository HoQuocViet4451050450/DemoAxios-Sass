import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NguoidungListComponent } from './components/nguoidung-list/nguoidung-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { SassComponent } from './components/sass/sass.component';
import { BangluongListComponent } from './components/bangluong-list/bangluong-list.component';
import { PhongbanListComponent } from './components/phongban-list/phongban-list.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sass', component: SassComponent },
  { path: 'nguoidung-list', component: NguoidungListComponent },
  { path: 'bangluong-list', component: BangluongListComponent },
  { path: 'phongban-list', component: PhongbanListComponent },
  { path: 'sidemenu', component: SidemenuComponent },
  { path: 'menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
