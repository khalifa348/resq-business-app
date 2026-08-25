import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

// Default Austin, TX coordinates
const DEFAULT_DRIVER = [-97.7410, 30.2710];
const DEFAULT_PICKUP = [-97.7455, 30.2620];
const DEFAULT_ROUTE = [
  [-97.7410, 30.2710],
  [-97.7415, 30.2695],
  [-97.7425, 30.2680],
  [-97.7435, 30.2670],
  [-97.7440, 30.2655],
  [-97.7448, 30.2640],
  [-97.7455, 30.2620],
];

export default function MapboxMap({
  center = [-97.7431, 30.2672],
  zoom = 13,
  style = 'mapbox://styles/mapbox/dark-v11',
  interactive = true,
  className = '',
  showDimOverlay = false,
  driverPosition,
  pickupPosition,
  routeCoordinates,
  showRoute = true,
  children,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const driverPos = driverPosition || DEFAULT_DRIVER;
  const pickupPos = pickupPosition || DEFAULT_PICKUP;
  const routeCoords = routeCoordinates || DEFAULT_ROUTE;

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.warn('Mapbox token not found. Add VITE_MAPBOX_TOKEN to .env');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style,
      center,
      zoom,
      interactive,
      attributionControl: false,
      logoPosition: 'bottom-right',
      fadeDuration: 200,
    });

    map.on('load', () => {
      map.resize();

      // --- Route Polyline ---
      if (showRoute && routeCoords.length >= 2) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoords,
            },
          },
        });

        map.addLayer({
          id: 'route-line-glow',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#A8C256',
            'line-width': 6,
            'line-opacity': 0.3,
            'line-blur': 6,
          },
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#A8C256',
            'line-width': 3,
            'line-opacity': 0.9,
          },
        });

        // Animated dash effect
        map.addLayer({
          id: 'route-line-dash',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#C6D96E',
            'line-width': 1.5,
            'line-opacity': 0.6,
            'line-dasharray': [0, 4, 3],
          },
        });

        let dashOffset = 0;
        const animateDash = () => {
          dashOffset -= 0.5;
          if (map.getLayer('route-line-dash')) {
            map.setPaintProperty('route-line-dash', 'line-dasharray', [2, 4, 3]);
            try {
              map.setPaintProperty('route-line-dash', 'line-offset', dashOffset);
            } catch (_) {
              // offset not supported in all styles
            }
          }
          requestAnimationFrame(animateDash);
        };
        requestAnimationFrame(animateDash);
      }

      // --- Driver Position: Pulsing Green Dot ---
      const driverEl = document.createElement('div');
      driverEl.className = 'map-driver-marker';
      driverEl.innerHTML = `
        <div class="driver-pulse-ring"></div>
        <div class="driver-dot"></div>
      `;
      const driverMarker = new mapboxgl.Marker({ element: driverEl, anchor: 'center' })
        .setLngLat(driverPos)
        .addTo(map);
      markersRef.current.push(driverMarker);

      // --- Pickup Pin Marker ---
      const pickupEl = document.createElement('div');
      pickupEl.className = 'map-pickup-marker';
      pickupEl.innerHTML = `
        <div class="pickup-pin">
          <div class="pickup-pin-head"></div>
          <div class="pickup-pin-tail"></div>
        </div>
        <div class="pickup-pulse-ring"></div>
      `;
      const pickupMarker = new mapboxgl.Marker({ element: pickupEl, anchor: 'bottom' })
        .setLngLat(pickupPos)
        .addTo(map);
      markersRef.current.push(pickupMarker);

      // --- Fit bounds to show both markers ---
      const bounds = new mapboxgl.LngLatBounds()
        .extend(driverPos)
        .extend(pickupPos);
      routeCoords.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 80, maxZoom: 15, duration: 800 });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* 30% dim overlay */}
      {showDimOverlay && <div className="map-dim-overlay" />}

      <div ref={mapContainerRef} className={`w-full h-full ${className}`}>
        {children}
      </div>
    </div>
  );
}
