import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { controlCenterGuard } from './control-center.guard';

describe('controlCenterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlCenterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
