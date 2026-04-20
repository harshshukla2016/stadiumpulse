import { createNavigationUrls, createFallbackNavigationIntel } from './navigation';
import { fallbackVenueIntel } from './venueIntel';

describe('Library Logic Coverage', () => {
  it('covers createNavigationUrls and createFallbackNavigationIntel', () => {
    const origin = { latitude: 26.4631, longitude: 80.3479 };
    const fallback = createFallbackNavigationIntel(origin);
    expect(fallback.status).toBe('fallback');
    expect(fallback.origin.latitude).toBe(origin.latitude);

    const urls = createNavigationUrls(origin, fallback.pickup, fallback.dropoff);
    expect(urls.mapEmbedUrl).toContain('google.com/maps');
    expect(urls.bookingUrl).toContain('uber.com');
  });

  it('verifies fallbackVenueIntel structure', () => {
    expect(fallbackVenueIntel.status).toBe('fallback');
    expect(fallbackVenueIntel.location.city).toBe('Kanpur');
  });
});
