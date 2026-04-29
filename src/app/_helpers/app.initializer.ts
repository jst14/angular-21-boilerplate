import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
  return () => {
    // Only run token refresh in browser environment
    if (typeof window !== 'undefined') {
      return new Promise<void>(resolve => {
        accountService.refreshToken().subscribe(() => resolve());
      });
    }
    return Promise.resolve();
  };
}