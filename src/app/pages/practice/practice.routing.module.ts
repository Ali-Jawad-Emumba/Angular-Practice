import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from './practice.component';
import { AuthGuard } from '../../utils/route-guards/auth-guard.guard'; // Import the AuthGuard

const routes: Routes = [
  {
    path: '',
    component: PracticeComponent,
    canActivate: [AuthGuard], // Apply guard here
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeRoutingModule {}
