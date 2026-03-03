import { TestBed } from '@angular/core/testing';

import { ShelfServices } from './shelf-services';

describe('ShelfServices', () => {
  let service: ShelfServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelfServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
