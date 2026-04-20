import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PulseAgent from './PulseAgent';
import { EventProvider } from '../context/EventContext';
import '@testing-library/jest-dom';

describe('PulseAgent Component', () => {
  it('renders correctly and toggles expansion with multiple insights', async () => {
    // Note: PulseAgent uses useEventEngine which has 1 default insight.
    // We can't easily inject state here without a custom provider wrapper 
    // or just relying on the fact that production code adds insights over time.
    // However, to hit line 53 (the loop), we need the state to have > 1 insight.
    // The EventProvider starts with 1. After 5 seconds it adds another.
    
    jest.useFakeTimers();
    
    await act(async () => {
        render(
            <EventProvider>
                <PulseAgent />
            </EventProvider>
        );
    });

    const button = screen.getByRole('button', { name: /toggle pulse agent/i });
    
    // Advance time to get a second insight (Simulation Tick)
    await act(async () => {
        jest.advanceTimersByTime(5000);
    });

    await act(async () => {
        fireEvent.click(button);
    });
    
    expect(screen.getByText(/recent reasoning/i)).toBeInTheDocument();
  });
});
