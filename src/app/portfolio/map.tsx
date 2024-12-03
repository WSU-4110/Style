// MapComponent.tsx
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import dynamic from 'next/dynamic';
const MapboxDirections: any = require('@mapbox/mapbox-gl-directions');


const MapComponent: React.FC = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FwYW5hMTUiLCJhIjoiY200NmsxMmhoMTZuYjJrb2hmOXAzM2FkaCJ9.QPa1Y7edvLtpKxYXQOq4uA";

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position: GeolocationPosition) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([-2.24, 53.48]); 
    }

    function setupMap(center: [number, number]) {
      const map = new mapboxgl.Map({
        container: "map", 
        style: "mapbox://styles/mapbox/streets-v11", 
        center: center, 
        zoom: 15, 
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });

      map.addControl(directions, "top-left");
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default MapComponent;
