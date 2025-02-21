import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users-service/users.service';
import { map, take } from 'rxjs';

export const controlCenterGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
    const router = inject(Router);
  
    return usersService.loggedUserObs.pipe(
      take(1),
      map((loggedUser) => {
        if (!loggedUser || loggedUser.name !== usersService.admin.name)
          router.navigate(['/all-books']);
  
        return true;
      })
    );
};
