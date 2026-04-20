import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PulseAgent from './PulseAgent';
import { EventProvider } from '../context/EventContext';
import '@testing-library/jest-dom';

// Next.js components might need to run in an environment with intersection observers, etc.
// But this is a standard React component test.

describe('PulseAgent Component', () => {
  it('renders the agent button accessible to screen readers', () => {
    render(
      <EventProvider>
        <PulseAgent />
      </EventProvider>
    );

    const button = screen.getByRole('button', { name: /toggle pulse agent/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles the thought bubble when clicked', () => {
    render(
      <EventProvider>
        <PulseAgent />
      </EventProvider>
    );

    const button = screen.getByRole('button', { name: /toggle pulse agent/i });
    
    // Initially not fully expanded (thought bubble may show initially via timer, but let's test toggle)
    fireEvent.click(button);
    
    expect(screen.getByText(/recent reasoning/i)).toBeInTheDocument();
  });
});
