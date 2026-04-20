import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PulseView from './PulseView';
import { EventProvider } from '../../context/EventContext';
import '@testing-library/jest-dom';

import { EventProvider } from '../../context/EventContext';
import '@testing-library/jest-dom';

// Simple mock for mediaDevices to support toggleMic testing
beforeAll(() => {
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: jest.fn().mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }],
      }),
    },
    writable: true,
  });
  
  // Mock AudioContext which is used by EventContext
  (global as unknown as { AudioContext: unknown }).AudioContext = jest.fn().mockImplementation(() => ({
    createMediaStreamSource: jest.fn().mockReturnValue({ connect: jest.fn() }),
    createAnalyser: jest.fn().mockReturnValue({
      fftSize: 2048,
      smoothingTimeConstant: 0.8,
      getFloatTimeDomainData: jest.fn(),
    }),
    close: jest.fn().mockResolvedValue(undefined),
    resume: jest.fn().mockResolvedValue(undefined),
    state: 'running',
  }));
});

describe('PulseView Component Strict Analysis', () => {
  it('toggles AR Mode and displays WebXR elements', async () => {
    render(
      <EventProvider>
        <PulseView />
      </EventProvider>
    );

    const arToggle = screen.getByRole('button', { name: /webxr/i });
    await act(async () => {
      fireEvent.click(arToggle);
    });

    expect(arToggle).toHaveTextContent(/ar active/i);
    expect(screen.getByText(/spatial tracking on/i)).toBeInTheDocument();
  });

  it('selects a zone and shows AI intelligence overlay', async () => {
    render(
      <EventProvider>
        <PulseView />
      </EventProvider>
    );

    const arenaMap = screen.getByLabelText(/live arena density map/i);
    expect(arenaMap).toBeInTheDocument();

    const northStandCircle = screen.getByTestId('zone-1');
    await act(async () => {
      fireEvent.click(northStandCircle);
    });

    expect(screen.getByText(/ai zone analysis: north stand/i)).toBeInTheDocument();
  });

  it('toggles microphone state correctly', async () => {
    render(
      <EventProvider>
        <PulseView />
      </EventProvider>
    );

    const micButton = screen.getByRole('button', { name: /start microphone/i });
    
    // We need to act and wait for the state transition
    await act(async () => {
      fireEvent.click(micButton);
      // Wait for any async effects (like AudioContext initialization)
      await new Promise(r => setTimeout(r, 100));
    });

    expect(screen.getByLabelText(/stop microphone/i)).toBeInTheDocument();
    expect(screen.getByText(/^live$/i)).toBeInTheDocument();
  });
});
