import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EchoFeed from './EchoFeed';
import { EventProvider } from '../../context/EventContext';
import '@testing-library/jest-dom';

jest.useFakeTimers();

const wrap = (comp: React.ReactNode) => (
  <EventProvider>
    {comp}
  </EventProvider>
);

describe('EchoFeed Surgical Coverage', () => {
  it('hits all incident branches including cancel', async () => {
    await act(async () => {
      render(wrap(<EchoFeed />));
    });

    // 1. Cancel branch (Line 250)
    await act(async () => {
      fireEvent.click(screen.getByTestId('report-btn'));
    });
    const cancelBtn = screen.getByText(/cancel/i);
    await act(async () => { fireEvent.click(cancelBtn); });
    expect(screen.queryByPlaceholderText(/location/i)).not.toBeInTheDocument();

    // 2. Incident types (Line 246-247)
    await act(async () => {
      fireEvent.click(screen.getByTestId('report-btn'));
    });
    
    const locInput = await screen.findByPlaceholderText(/location/i);
    await act(async () => {
      fireEvent.change(locInput, { target: { value: 'Aisle 1' } });
      fireEvent.click(screen.getByText(/medical/i));
    });

    await act(async () => {
        fireEvent.click(screen.getByTestId('report-btn'));
    });
    
    const locInput2 = await screen.findByPlaceholderText(/location/i);
    await act(async () => {
        fireEvent.change(locInput2, { target: { value: 'Aisle 2' } });
        fireEvent.click(screen.getByText(/security/i));
    });

    // 3. Resolve & Clear
    const resolveBtns = await screen.findAllByTestId('resolve-btn');
    await act(async () => { fireEvent.click(resolveBtns[0]); });

    // 4. Spectrum ON/OFF
    const toggleBtn = screen.getByText(/^on$/i);
    await act(async () => { fireEvent.click(toggleBtn); });
    expect(screen.getByText(/paused/i)).toBeInTheDocument();
  });
});
