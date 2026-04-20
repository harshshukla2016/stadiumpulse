import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { EventProvider, useEventEngine } from './EventContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const { state, isReady, setEventType, toggleMic, reportIncident, resolveIncident } = useEventEngine();
  return (
    <div>
      <span data-testid="ready-indicator">{isReady ? 'READY' : 'LOADING'}</span>
      <span>Event: {state.eventType}</span>
      <span>Clock: {state.gameClock}</span>
      <span>Status: {state.aisleStatus}</span>
      <button onClick={() => setEventType('CONCERT')}>SetConcert</button>
      <button onClick={() => setEventType('COMEDY')}>SetComedy</button>
      <button onClick={() => toggleMic()}>ToggleMic</button>
      <button onClick={() => reportIncident('medical', 'Zone A')}>SOS</button>
      {state.incidents.map(inc => (
          <button key={inc.id} onClick={() => resolveIncident(inc.id)}>Resolve {inc.id}</button>
      ))}
    </div>
  );
};

describe('EventContext Full Simulation', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve({ status: 'nominal', latency: 20, load: 0.1 })
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('hits all logic branches via time travel and waits for ready', async () => {
    jest.useFakeTimers();
    
    await act(async () => {
      render(
        <EventProvider>
          <TestComponent />
        </EventProvider>
      );
    });

    // Wait for initial fetches (hits lines 88-104)
    await waitFor(() => {
      expect(screen.getByTestId('ready-indicator')).toHaveTextContent('READY');
    });

    // 1. Initial State & SOS Logic (Line 413-432)
    await act(async () => { fireEvent.click(screen.getByText('SOS')); });
    expect(screen.getByText(/status: locked/i)).toBeInTheDocument();
    
    // 2. Resolve Logic (ID should be inc-0)
    const resolveBtn = await screen.findByText(/resolve inc-0/i);
    await act(async () => { fireEvent.click(resolveBtn); });
    expect(screen.getByText(/status: open/i)).toBeInTheDocument();

    // 3. IPL Simulation (Line 302-323)
    for (let i = 0; i < 30; i++) {
        await act(async () => { jest.advanceTimersByTime(5000); });
    }

    // 4. Concert Simulation (Line 325-336)
    await act(async () => { fireEvent.click(screen.getByText('SetConcert')); });
    for (let i = 0; i < 20; i++) {
        await act(async () => { jest.advanceTimersByTime(5000); });
    }

    // 5. Comedy Simulation (Line 338-344)
    await act(async () => { fireEvent.click(screen.getByText('SetComedy')); });
    for (let i = 0; i < 15; i++) {
        await act(async () => { jest.advanceTimersByTime(5000); });
    }

    // 6. Mic Toggle & Insight Loop (Line 347-357)
    await act(async () => { fireEvent.click(screen.getByText('ToggleMic')); });
    for (let i = 0; i < 5; i++) {
        await act(async () => { jest.advanceTimersByTime(5000); });
    }
    
    jest.useRealTimers();
  });
});
