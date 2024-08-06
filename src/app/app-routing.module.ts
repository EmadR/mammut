import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CeremoniesComponent} from "./ceremonies/ceremonies.component";

const routes: Routes = [
  {path: '', redirectTo: 'ceremonies', pathMatch: "full"},
  {
    path: 'ceremonies',
    component: CeremoniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
