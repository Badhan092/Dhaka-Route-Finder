'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { resolveGeoStop } from '@/lib/locationUtils';
import { MapPinOff } from 'lucide-react';

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((m) => m.Polyline),
  { ssr: false }
);

export default function RouteMap({ stops = [], highlightFrom = null, highlightTo = null }) {
  const [leafletInstance, setLeafletInstance] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    import('leaflet').then((L) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setLeafletInstance(L);
    });
  }, []);

  if (!isMounted || !leafletInstance) {
    return (
      <div className="w-full h-80 bg-slate-100 flex items-center justify-center rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Loading interactive Dhaka transit map...
        </div>
      </div>
    );
  }

  const mappedStops = stops
    .map((stopName) => {
      const geo = resolveGeoStop(stopName);
      return geo ? { name: stopName, ...geo } : null;
    })
    .filter(Boolean);

  if (mappedStops.length === 0) {
    return (
      <div className="p-6 bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 text-sm flex items-start gap-3">
        <MapPinOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">Map preview not available</p>
          <p className="text-xs text-slate-500">
            The stops on this specific branch do not have indexed GPS nodes yet. Refer to the ordered stop sequence below.
          </p>
        </div>
      </div>
    );
  }

  const centerLat = mappedStops.reduce((sum, s) => sum + s.lat, 0) / mappedStops.length;
  const centerLng = mappedStops.reduce((sum, s) => sum + s.lng, 0) / mappedStops.length;
  const positions = mappedStops.map((s) => [s.lat, s.lng]);

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={positions}
          pathOptions={{ color: '#059669', weight: 4, opacity: 0.7, dashArray: '6, 8' }}
        />

        {mappedStops.map((stop, index) => {
          const isOrigin = highlightFrom && stop.name.toLowerCase() === highlightFrom.toLowerCase();
          const isDest = highlightTo && stop.name.toLowerCase() === highlightTo.toLowerCase();

          return (
            <Marker key={index} position={[stop.lat, stop.lng]}>
              <Popup>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{stop.name}</div>
                  {stop.bn && <div className="text-emerald-700">{stop.bn}</div>}
                  {isOrigin && (
                    <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded">
                      Starting Location
                    </span>
                  )}
                  {isDest && (
                    <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 font-semibold rounded">
                      Destination
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
