import { TestBed } from '@angular/core/testing';

import { ClientHttpServiceService } from './client-http-service.service';

describe('ClientHttpServiceService', () => {
  let service: ClientHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
