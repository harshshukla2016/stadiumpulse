import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';
import '@testing-library/jest-dom';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LandingPage Strict Analysis', () => {
  it('renders hero title and call to action', () => {
    render(<LandingPage />);
    
    expect(screen.getByText(/run the venue/i)).toBeInTheDocument();
    expect(screen.getByText(/in real-time/i)).toBeInTheDocument();
  });

  it('navigates to dashboard when "Launch Dashboard" is clicked', () => {
    render(<LandingPage />);
    
    const launchButtons = screen.getAllByText(/launch dashboard/i);
    // There are multiple launch buttons (hero and CTA section)
    fireEvent.click(launchButtons[0]);
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('renders core feature cards', () => {
    render(<LandingPage />);
    
    expect(screen.getByText(/real-time analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/spatial routing/i)).toBeInTheDocument();
    expect(screen.getByText(/staff coordination/i)).toBeInTheDocument();
  });
});
