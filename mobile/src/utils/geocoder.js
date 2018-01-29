import Geocoder from 'react-native-geocoder'
import { countries } from 'country-data'

export function detectCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        findLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }).
        then((location) => resolve(location)).
        catch((error) => reject(error))
      },
      (error) => reject(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
  })
}

export function findLocation(coordinates) {
  return Geocoder.geocodePosition(coordinates).
           then(res => ({ country: res[0].countryCode,
                state: res[0].adminArea,
                city: res[0].locality }))
}
