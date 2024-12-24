import { TestBed } from '@angular/core/testing';

import { SpinnersInterceptor } from './spinners.interceptor';

describe('SpinnersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpinnersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpinnersInterceptor = TestBed.inject(SpinnersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
