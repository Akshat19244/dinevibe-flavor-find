
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  coordinates: LocationCoordinates;
  address: string;
  city: string;
  state: string;
  country: string;
}

export const getCurrentLocation = (): Promise<LocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('User denied the request for Geolocation.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('The request to get user location timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred.'));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
      }
    );
  });
};

export const reverseGeocode = async (coordinates: LocationCoordinates): Promise<LocationInfo> => {
  try {
    // In a real app, you'd use a geocoding service like Google Maps API
    // For now, we'll return mock data based on coordinates
    const mockLocationData: LocationInfo = {
      coordinates,
      address: 'Auto-detected location',
      city: 'Mumbai', // You would get this from the API
      state: 'Maharashtra',
      country: 'India'
    };
    
    return mockLocationData;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    throw new Error('Failed to get location information');
  }
};

export const requestLocationPermission = async (): Promise<LocationInfo> => {
  try {
    const coordinates = await getCurrentLocation();
    const locationInfo = await reverseGeocode(coordinates);
    return locationInfo;
  } catch (error) {
    console.error('Location permission error:', error);
    throw error;
  }
};

export const isLocationSupported = (): boolean => {
  return 'geolocation' in navigator;
};
