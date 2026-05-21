/**
 * components/MapTilerWebView.js
 *
 * Komponen peta berbasis WebView + Leaflet.js dengan MapTiler tiles.
 * Berjalan sempurna di Expo Go tanpa native build.
 *
 * Props:
 *   latitude         {number}   - Koordinat pusat peta
 *   longitude        {number}   - Koordinat pusat peta
 *   zoom             {number}   - Level zoom awal (default 13)
 *   markers          {Array}    - [{ latitude, longitude, title, description, color }]
 *   style            {Object}   - Style untuk container View
 *   onPress          {Function} - Callback tap peta → ({ latitude, longitude })
 *   showUserLocation {boolean}  - Dot biru posisi user (default false)
 *   interactive      {boolean}  - Aktifkan drag/zoom (default true)
 *                                 Saat true di dalam ScrollView, scroll parent
 *                                 otomatis dinonaktifkan saat user menyentuh peta.
 */

import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MAPTILER_API_KEY = 'lhtwo5aHnospHKm72fDE';
const TILE_URL        = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`;
const ATTRIBUTION     = '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

const MapTilerWebView = ({
  latitude         = -6.2088,
  longitude        = 106.8210,
  zoom             = 13,
  markers          = [],
  style,
  onPress,
  onScrollToggle,
  showUserLocation = false,
  interactive      = true,
}) => {
  const webRef           = useRef(null);
  // Saat user menyentuh peta, nonaktifkan scroll parent agar drag peta tidak konflik
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // ── Bangun marker JS ───────────────────────────────────────────────────────
  const markersJS = markers
    .filter(m => m.latitude && m.longitude)
    .map(m => {
      const title = (m.title       || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const desc  = (m.description || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `
        L.circleMarker([${m.latitude}, ${m.longitude}], {
          radius: 9, fillColor: '${m.color || '#2563EB'}',
          color: '#fff', weight: 2.5, opacity: 1, fillOpacity: 0.92
        }).bindPopup('<b>${title}</b>${desc ? '<br>' + desc : ''}').addTo(map);
      `;
    }).join('\n');

  // ── HTML Leaflet inline ────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
    .leaflet-control-attribution { font-size: 8px; }
    .leaflet-control-zoom { margin: 8px !important; }
    .leaflet-control-zoom a {
      width: 32px !important; height: 32px !important;
      line-height: 32px !important; font-size: 18px !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25) !important;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', {
      center:          [${latitude}, ${longitude}],
      zoom:            ${zoom},
      zoomControl:     ${interactive},
      dragging:        ${interactive},
      scrollWheelZoom: false,
      doubleClickZoom: ${interactive},
      touchZoom:       ${interactive},
      tap:             true,
    });

    L.tileLayer('${TILE_URL}', {
      attribution: '${ATTRIBUTION}',
      maxZoom: 19,
      tileSize: 256,
    }).addTo(map);

    ${markersJS}

    ${showUserLocation ? `
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var pulseIcon = L.divIcon({
          className: '',
          html: '<div style="width:14px;height:14px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 4px rgba(37,99,235,0.3)"></div>',
          iconSize: [14, 14], iconAnchor: [7, 7],
        });
        L.marker([pos.coords.latitude, pos.coords.longitude], { icon: pulseIcon })
          .bindPopup('Lokasi Anda').addTo(map);
      });
    }` : ''}

    ${interactive ? `
    // Beritahu React Native saat user mulai/selesai menyentuh peta
    // agar ScrollView di luar tidak konflik dengan drag peta
    document.getElementById('map').addEventListener('touchstart', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'TOUCH_START' }));
    }, { passive: true });
    document.getElementById('map').addEventListener('touchend', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'TOUCH_END' }));
    }, { passive: true });
    ` : ''}

    ${onPress ? `
    map.on('click', function(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type:      'MAP_PRESS',
        latitude:  e.latlng.lat,
        longitude: e.latlng.lng,
      }));
      if (window._pin) map.removeLayer(window._pin);
      window._pin = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    });` : ''}
  </script>
</body>
</html>`;

  // ── Handle pesan dari WebView ──────────────────────────────────────────────
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'TOUCH_START') { setScrollEnabled(false); onScrollToggle?.(false); }
      if (data.type === 'TOUCH_END')   { setScrollEnabled(true);  onScrollToggle?.(true);  }
      if (data.type === 'MAP_PRESS' && onPress) {
        onPress({ latitude: data.latitude, longitude: data.longitude });
      }
    } catch (_) {}
  };

  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webRef}
        source={{ html }}
        style={styles.webview}
        onMessage={handleMessage}
        // scrollEnabled di WebView sendiri selalu false (map yang scroll, bukan WebView)
        scrollEnabled={false}
        bounces={false}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        mixedContentMode="always"
        // nestedScrollEnabled agar gesture tidak dikonsumsi oleh ScrollView parent
        nestedScrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  webview:   { flex: 1, backgroundColor: 'transparent' },
});

export default MapTilerWebView;
