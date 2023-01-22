import { useRef, useState, useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import '../src/styles/app.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MapEventType, Map } from "mapbox-gl";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null);

  mapboxgl.accessToken = 'pk.eyJ1IjoidGVzdGViYXlhbm1lZCIsImEiOiJjazd1d2U4OTMxNW9hM2lvNGI3cGFyaGVnIn0.Q4bC04l_8IU6HqONKXbcDA';

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [51.3857, 35.6102],
      zoom: 9,
      attributionControl: true,
      interactive: true,
      hash: true,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: true
      },
      touchEnabled: true,
      defaultMode: 'draw_polygon'
    });

    map.current?.addControl(draw, 'top-right');

    draw.set({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          id: 'example-id',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [51.41742415918904, 35.73019558439101],
                [51.31319413385742, 35.702773908694724],
                [51.378997493472525, 35.665562843119986],
                [51.45008537540798, 35.67776544979942],
                [51.46619566741822, 35.70822028156377],
                [51.41742415918904, 35.73019558439101],
              ],
            ],
          }
        }
      ]
    });

    map.current?.on('draw.update', function(event: MapEventType){
      console.log(event)
    })
    map.current?.on('draw.delete', function(event: MapEventType){
      console.log(event);
    })
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}
