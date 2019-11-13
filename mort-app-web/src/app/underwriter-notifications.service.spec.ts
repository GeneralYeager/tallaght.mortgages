import { TestBed } from '@angular/core/testing';

import { UnderwriterNotificationsService } from './underwriter-notifications.service';

describe('UnderwriterNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnderwriterNotificationsService = TestBed.get(UnderwriterNotificationsService);
    expect(service).toBeTruthy();
  });
});
