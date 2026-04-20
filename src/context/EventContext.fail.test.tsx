import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { EventProvider } from './EventContext';
import '@testing-library/jest-dom';

describe('EventContext Error Handling', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('handles fetch failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Simulate fetch failure that is detectable
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('FAIL_TEST')));

    await act(async () => {
      render(
        <EventProvider>
          <div>Test</div>
        </EventProvider>
      );
    });

    // Patience is key for async catch blocks in JSDOM
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Fetch error:", expect.any(Error));
    }, { timeout: 1000 });
    
    consoleSpy.mockRestore();
  });
});
