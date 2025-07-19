import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';

export const loginRedirectGuard: CanActivateFn = () => {
  const getCurrentUserUseCase = inject(GetCurrentUserUseCase);
  const router = inject(Router);

  return getCurrentUserUseCase.execute().pipe(
    take(1),
    map(user => {
      if (user?.isAuthenticated) {
        router.navigate([user.getRedirectPath()]);
        return false;
      }
      return true;
    })
  );
};