import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact, { fitBounds } from 'google-map-react';

export default function Map({
  name,
  markers,
  className,
  defaultLat,
  defaultLng,
}) {
  const [mapCenter, setMapCenter] = React.useState({ lat: defaultLat || 0, lng: defaultLng || 0 });
  const [mapZoom, setMapZoom] = React.useState(1);

  React.useEffect(() => {
    function getBounds() {
      if (!markers) {
        return false;
      }

      const minMax = {
        maxLat: null,
        minLat: null,
        maxLng: null,
        minLng: null,
      };

      markers.forEach((marker) => {
        if (typeof minMax.maxLat !== 'number'
            || marker.props.lat > minMax.maxLat) {
          minMax.maxLat = marker.props.lat;
        }
        if (typeof minMax.minLat !== 'number'
            || marker.props.lat < minMax.minLat) {
          minMax.minLat = marker.props.lat;
        }
        if (typeof minMax.maxLng !== 'number'
            || marker.props.lng > minMax.maxLng) {
          minMax.maxLng = marker.props.lng;
        }
        if (typeof minMax.minLng !== 'number'
            || marker.props.lng < minMax.minLng) {
          minMax.minLng = marker.props.lng;
        }
      });

      const { center, zoom } = fitBounds({
        ne: {
          lat: minMax.maxLat || 0,
          lng: minMax.maxLng || 0,
        },
        sw: {
          lat: minMax.minLat || 0,
          lng: minMax.minLng || 0,
        },
      },
      {
        width: document.getElementById(`map-${name}`).offsetWidth,
        height: document.getElementById(`map-${name}`).offsetHeight,
      });

      setMapCenter(center);
      setMapZoom(zoom);
      return true;
    }
    getBounds(markers);
  }, [markers, name]);

  return (
    <div id={`map-${name}`} className={className}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDVTMmkoGWHihQ__1ZjDkSwW-OOOt5R4Wg' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
        center={mapCenter}
        zoom={mapZoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}

Map.defaultProps = {
  name: 'default1',
  markers: [],
  className: '',
  defaultLat: 0,
  defaultLng: 0,
};

Map.propTypes = {
  name: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  defaultLat: PropTypes.number,
  defaultLng: PropTypes.number,
};
