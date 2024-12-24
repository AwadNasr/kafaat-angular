import { TestBed } from '@angular/core/testing';

import { AttachmentsActivityService } from './attachments-activity.service';

describe('AttachmentsActivityService', () => {
  let service: AttachmentsActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentsActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
