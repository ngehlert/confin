import { TestBed } from '@angular/core/testing';

import { DemoInterceptor } from './demo.interceptor';

describe('DemoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DemoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DemoInterceptor = TestBed.inject(DemoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
