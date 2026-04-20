import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EcoDashboard from './EcoDashboard';
import { EventProvider } from '../../context/EventContext';
import '@testing-library/jest-dom';

jest.useFakeTimers();

const wrap = (comp: React.ReactNode) => (
  <EventProvider>
    {comp}
  </EventProvider>
);

describe('EcoDashboard Surgical Coverage', () => {
  it('hits 100% of carpool and navigation branches', async () => {
    await act(async () => {
      render(wrap(<EcoDashboard />));
    });

    // 1. Carpool Join (38-42)
    const joinBtn = screen.getByLabelText(/join carpool/i);
    await act(async () => { fireEvent.click(joinBtn); });
    expect(screen.getByLabelText(/carpool joined/i)).toBeInTheDocument();

    // 2. Navigation Launch & Timer (32-33)
    const navBtn = screen.getByText(/start navigation/i);
    await act(async () => { fireEvent.click(navBtn); });
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    // Verify it automatically stopped isNavigating after 2.5s
    expect(screen.getByText(/start navigation/i)).toBeInTheDocument();
  });
});
