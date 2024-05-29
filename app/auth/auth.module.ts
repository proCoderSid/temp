import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleGuardDirective } from './directives/role-guard.directive';

@NgModule({
  declarations: [RoleGuardDirective],
  imports: [CommonModule],
  exports: [RoleGuardDirective]
})
export class AuthModule {}
