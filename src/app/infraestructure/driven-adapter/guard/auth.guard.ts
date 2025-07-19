import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const getCurrentUserUseCase = inject(GetCurrentUserUseCase);
  const router = inject(Router);

  return getCurrentUserUseCase.execute().pipe(
    take(1),
    map(user => {
      if (user?.isAuthenticated) {
        return true;
      }

      router.navigate(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    })
  );
};