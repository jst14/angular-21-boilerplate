import { AccountService } from '@app/_services';
import { catchError, timeout } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export function appInitializer(accountService: AccountService) {
    return () => accountService.refreshToken().pipe(
        timeout(5000),         // give up after 5 seconds
        catchError(() => EMPTY)
    );
}