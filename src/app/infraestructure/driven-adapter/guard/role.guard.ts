import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map, take } from 'rxjs';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { UserRole, Permission } from '@models/Auth/auth-user';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const getCurrentUserUseCase = inject(GetCurrentUserUseCase);
  const router = inject(Router);

  
  const allowedRoles = route.data['roles'] as UserRole[];
  const requiredPermissions = route.data['permissions'] as Permission[];

  return getCurrentUserUseCase.execute().pipe(
    take(1),
    map(user => {
      if (!user?.isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        redirectByRole(router, user.role);
        return false;
      }

      if (requiredPermissions && !hasRequiredPermissions(user, requiredPermissions)) {
        redirectByRole(router, user.role);
        return false;
      }

      return true;
    })
  );
};

function hasRequiredPermissions(user: any, permissions: Permission[]): boolean {
  return permissions.every(permission => user.hasPermission(permission));
}

function redirectByRole(router: Router, role: UserRole): void {
  const redirectPath = role === UserRole.ADMIN ? '/dashboard/admin' : '/dashboard/cajero';
  router.navigate([redirectPath]);
}
