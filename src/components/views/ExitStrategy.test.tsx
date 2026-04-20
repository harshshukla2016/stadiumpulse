import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ExitStrategy from './ExitStrategy';
import { EventProvider } from '../../context/EventContext';
import '@testing-library/jest-dom';

const wrap = (comp: React.ReactNode) => (
  <EventProvider>
    {comp}
  </EventProvider>
);

describe('ExitStrategy Surgical Coverage', () => {
  it('hits 100% of claims and state branches', async () => {
    await act(async () => {
      render(wrap(<ExitStrategy />));
    });

    // 1. Book Rideshare
    const rideBtn = screen.getByText(/book rideshare/i);
    await act(async () => { fireEvent.click(rideBtn); });
    expect(screen.getByText(/rideshare booked/i)).toBeInTheDocument();

    // 2. Claim Lounge
    const claimBtn = screen.getByText(/^claim$/i);
    await act(async () => { fireEvent.click(claimBtn); });
    expect(screen.getByText(/claimed/i)).toBeInTheDocument();

    // 3. Match Carpool
    const carpoolBtn = screen.getByText(/match carpool/i);
    await act(async () => { fireEvent.click(carpoolBtn); });
    expect(screen.getByText(/carpool match active/i)).toBeInTheDocument();
  });
});
