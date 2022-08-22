import { TestBed } from '@angular/core/testing';

import { AddingMenuService } from './adding-menu.service';

describe('AddingMenuService', () => {
  let service: AddingMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
