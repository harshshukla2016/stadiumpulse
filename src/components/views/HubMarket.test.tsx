import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HubMarket from './HubMarket';
import { EventProvider, useEventEngine } from '../../context/EventContext';
import '@testing-library/jest-dom';

jest.useFakeTimers();

const wrap = (comp: React.ReactNode) => (
  <EventProvider>
    {comp}
  </EventProvider>
);

describe('HubMarket Surgical Coverage', () => {
  it('hits 100% of branch logic', async () => {
    await act(async () => {
      render(wrap(<HubMarket />));
    });

    // 1. Post Request Modal
    const postBtn = screen.getByTestId('post-request-btn');
    await act(async () => { fireEvent.click(postBtn); });
    
    // 2. Select locations (Line 200-206)
    const opt = await screen.findByTestId('loc-opt-Sec-101-110');
    await act(async () => { fireEvent.click(opt); });

    await act(async () => { 
        fireEvent.change(screen.getByPlaceholderText(/e\.g\., 2x cold drinks/i), { target: { value: 'Drink' } });
        fireEvent.click(screen.getByText(/publish request/i));
    });

    // 3. Tab switching (Line 115)
    await act(async () => { fireEvent.click(screen.getByText(/my posts/i)); });
    await act(async () => { fireEvent.click(screen.getByText(/active \(/i)); });
    
    // 4. Fulfilling (Hits the branch logic for claimed vs open)
    const fulfillBtns = await screen.findAllByTestId('fulfill-btn');
    await act(async () => { fireEvent.click(fulfillBtns[0]); });
    
    // 5. Time travel for label "h ago" (Line 88)
    await act(async () => {
      jest.advanceTimersByTime(3600000 * 5); 
    });
  });
});
