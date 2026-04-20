import React from 'react';
import { renderHook } from '@testing-library/react';
import { useEventEngine } from './EventContext';
import '@testing-library/jest-dom';

describe('EventContext Hook Validation', () => {
  it('throws error when used outside provider', () => {
    // Suppress console error for this expected error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useEventEngine())).toThrow("useEventEngine must be used within an EventProvider");
    
    consoleSpy.mockRestore();
  });
});
