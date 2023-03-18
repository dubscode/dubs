import { RequestStatus, useAuth } from './use-auth';
import { act, renderHook } from '@testing-library/react';

import { faker } from '@faker-js/faker';

describe('useAuth', () => {
  it('should have initial status of IDLE', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.status).toBe(RequestStatus.IDLE);
  });

  it('should have status of ERROR with bad email', async () => {
    const { result } = renderHook(() => useAuth());
    const badEmail = 'badEMAIL@example';
    act(() => {
      result.current.login(badEmail);
    });
    expect(result.current.status).toBe(RequestStatus.ERROR);
  });

  it('should have status of FETCHING', async () => {
    const { result } = renderHook(() => useAuth());
    const goodEmail = faker.internet.email();
    act(() => {
      result.current.login(goodEmail);
    });
    expect(result.current.status).toBe(RequestStatus.FETCHING);
  });
});
