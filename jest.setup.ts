import '@testing-library/jest-dom';

// IntersectionObserver Mock
class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// ResizeObserver Mock
class ResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

// AudioContext & MediaDevices mocks (moved from individual tests to global for total coverage)
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  },
  writable: true,
});

(global as unknown as { AudioContext: unknown }).AudioContext = jest.fn().mockImplementation(() => ({
  createMediaStreamSource: jest.fn().mockReturnValue({ connect: jest.fn() }),
  createAnalyser: jest.fn().mockReturnValue({
    fftSize: 2048,
    smoothingTimeConstant: 0.8,
    getFloatTimeDomainData: jest.fn(),
  }),
  close: jest.fn().mockResolvedValue(undefined),
  resume: jest.fn().mockResolvedValue(undefined),
  state: 'running',
}));
