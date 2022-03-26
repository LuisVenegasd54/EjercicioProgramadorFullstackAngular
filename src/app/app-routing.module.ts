import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatsComponent} from "./Components/stats/stats.component"

const routes: Routes = [
  {path: '**', component: StatsComponent},
  {path:"stats",  component: StatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
