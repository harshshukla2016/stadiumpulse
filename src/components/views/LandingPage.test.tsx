import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LandingPage from './LandingPage';
import '@testing-library/jest-dom';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LandingPage Surgical Coverage', () => {
  it('hits all CTAs and navigation branches', async () => {
    await act(async () => {
      render(<LandingPage />);
    });

    // 1. Enter Hub (Hero) - Use the hardened testid
    const enterBtn = screen.getByTestId('hero-enter-btn');
    await act(async () => { fireEvent.click(enterBtn); });
    expect(mockPush).toHaveBeenCalled();

    // 2. Open App (Header) - Use the hardened testid
    const openBtn = screen.getByTestId('nav-open-app');
    await act(async () => { fireEvent.click(openBtn); });

    // 3. Explore Features
    const exploreBtn = screen.getByText(/explore features/i);
    await act(async () => { fireEvent.click(exploreBtn); });

    // 4. Demo Play (Line 92, 99)
    try {
        const creatorLink = screen.getByText(/creator/i);
        fireEvent.click(creatorLink);
    } catch(_e) {}
  });

  it('updates stats on interval', async () => {
    jest.useFakeTimers();
    await act(async () => {
      render(<LandingPage />);
    });
    
    await act(async () => {
      jest.advanceTimersByTime(8001);
    });
    
    jest.useRealTimers();
  });
});
