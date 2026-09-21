import React from 'react';
import { 
  GeoapifyGeocoderAutocomplete, 
  GeoapifyContext 
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const UbicacionSelector = ({ value, onSeleccionar, placeholder = "Buscar ubicación exacta..." }) => {
  const handlePlaceSelect = (valueSelected) => {
    if (valueSelected) {
      const { lat, lon, formatted, district, city, state } = valueSelected.properties;
      const zonaSugerida = district || city || state || "";

      onSeleccionar({
        latitud: lat,
        longitud: lon,
        direccionCompleta: formatted,
        zona: zonaSugerida
      });
    } else {
      onSeleccionar(null);
    }
  };

  return (
    <div className="w-full relative rounded-xl border border-slate-800 bg-slate-950 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600/30 transition-all text-xs">
      <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
        <GeoapifyGeocoderAutocomplete
          placeholder={placeholder}
          value={value || ""}
          lang="es"
          filterByCountryCode={['ve']}
          placeSelect={handlePlaceSelect}
        />
      </GeoapifyContext>
    </div>
  );
};