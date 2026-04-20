import React from 'react';
import { render, act } from '@testing-library/react';
import { EventProvider, useEventEngine } from './EventContext';
import '@testing-library/jest-dom';

jest.useFakeTimers();

const DeepTestComponent = () => {
  const { state, setEventType, reportIncident, resolveIncident } = useEventEngine();
  return (
    <div>
      <div data-testid="clock">{state.gameClock}</div>
      <div data-testid="status">{state.aisleStatus}</div>
      <button onClick={() => setEventType('CONCERT')}>Concert</button>
      <button onClick={() => setEventType('COMEDY')}>Comedy</button>
      <button onClick={() => reportIncident('medical', 'Zone A')}>Incident</button>
      <button onClick={() => resolveIncident(state.incidents[0]?.id)}>Resolve</button>
    </div>
  );
};

describe('EventContext Deep Simulation', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('venue-intel')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: 'live', location: { latitude: 0, longitude: 0 } }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: 'ready' }) });
    });
  });

  it('handles IPL clock ticks and transition to Innings Break', async () => {
    const { getByTestId } = render(
      <EventProvider>
        <DeepTestComponent />
      </EventProvider>
    );

    // Initial state
    expect(getByTestId('clock')).toHaveTextContent('18.4 Overs');

    // Advance 10 ticks (50 seconds)
    act(() => {
      jest.advanceTimersByTime(50000);
    });

    expect(getByTestId('clock')).toHaveTextContent(/overs|break/i);
  });

  it('handles CONCERT and COMEDY transitions', () => {
    const { getByText, getByTestId } = render(
      <EventProvider>
        <DeepTestComponent />
      </EventProvider>
    );

    act(() => {
      getByText('Concert').click();
    });
    expect(getByTestId('clock')).toHaveTextContent('Song 1/15');

    act(() => {
      getByText('Comedy').click();
    });
    expect(getByTestId('clock')).toHaveTextContent('12:00');

    // Advance COMEDY to near-end to trigger LOCKING logic
    act(() => {
      jest.advanceTimersByTime(10 * 60000); // 10 minutes pass
    });
    expect(getByTestId('status')).toHaveTextContent('LOCKED');
  });

  it('handles CONCERT intermission and final locking', async () => {
    const { getByText, getByTestId } = render(
      <EventProvider>
        <DeepTestComponent />
      </EventProvider>
    );

    act(() => {
      getByText('Concert').click();
    });

    // Advance to Song 8 for Intermission OPEN status
    act(() => {
      jest.advanceTimersByTime(7 * 5000); // 7 ticks * 5 seconds
    });
    // Check if Intermission logic is hit
    expect(getByTestId('status')).toHaveTextContent('OPEN');

    // Advance to Song 13 for final LOCKED status
    act(() => {
      jest.advanceTimersByTime(5 * 5000);
    });
    expect(getByTestId('status')).toHaveTextContent('LOCKED');
  });

  it('locks aisles on critical incidents', async () => {
    const { getByText, getByTestId } = render(
      <EventProvider>
        <DeepTestComponent />
      </EventProvider>
    );

    await act(async () => {
      getByText('Incident').click();
    });
    expect(getByTestId('status')).toHaveTextContent('LOCKED');

    act(() => {
      getByText('Resolve').click();
    });
    expect(getByTestId('status')).toHaveTextContent('OPEN');
  });
});
