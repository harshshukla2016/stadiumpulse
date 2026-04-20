import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { EventProvider, useEventEngine } from './EventContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const { state, setEventType } = useEventEngine();
  
  return (
    <div>
      <div data-testid="event-type">{state.eventType}</div>
      <div data-testid="aisle-status">{state.aisleStatus}</div>
      <button onClick={() => setEventType('CONCERT')}>Set Concert</button>
    </div>
  );
};

describe('EventContext Integration', () => {
  it('initializes with default IPL state', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );
    expect(screen.getByTestId('event-type')).toHaveTextContent('IPL');
    expect(screen.getByTestId('aisle-status')).toHaveTextContent('OPEN');
  });

  it('updates state correctly when changing event type', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );
    
    act(() => {
      screen.getByText('Set Concert').click();
    });

    expect(screen.getByTestId('event-type')).toHaveTextContent('CONCERT');
  });
});
