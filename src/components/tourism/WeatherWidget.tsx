'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, ThermometerSun, Wind, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  locationName: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lon, locationName }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="w-full h-32 bg-white/40 backdrop-blur-md rounded-2xl animate-pulse flex items-center justify-center border border-white/20 shadow-lg">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="w-full p-4 bg-red-50/50 backdrop-blur-md rounded-2xl border border-red-100 text-red-500 text-sm flex items-center gap-2 shadow-lg">
        <ThermometerSun className="w-5 h-5" />
        Could not load live weather for {locationName}.
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    const main = condition.toLowerCase();
    switch (main) {
      case 'clear': return <Sun className="w-12 h-12 text-yellow-400 drop-shadow-md" />;
      case 'clouds': return <Cloud className="w-12 h-12 text-gray-400 drop-shadow-md" />;
      case 'rain': return <CloudRain className="w-12 h-12 text-blue-400 drop-shadow-md" />;
      case 'drizzle': return <CloudDrizzle className="w-12 h-12 text-blue-300 drop-shadow-md" />;
      case 'thunderstorm': return <CloudLightning className="w-12 h-12 text-purple-500 drop-shadow-md" />;
      case 'snow': return <CloudSnow className="w-12 h-12 text-cyan-200 drop-shadow-md" />;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog': return <CloudFog className="w-12 h-12 text-gray-400 drop-shadow-md" />;
      default: return <Sun className="w-12 h-12 text-yellow-400 drop-shadow-md" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-1">
              Live Weather
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{locationName}</p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            {getWeatherIcon(weatherData.condition)}
          </motion.div>
        </div>

        <div className="flex items-end gap-3 mb-6">
          <span className="text-5xl font-black text-gray-800 tracking-tighter">
            {Math.round(weatherData.temp)}°
          </span>
          <span className="text-lg font-semibold text-gray-500 mb-1 capitalize">
            {weatherData.description}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-2xl p-3 flex items-center gap-3 border border-white">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Humidity</p>
              <p className="font-semibold text-gray-800">{weatherData.humidity}%</p>
            </div>
          </div>
          
          <div className="bg-white/50 rounded-2xl p-3 flex items-center gap-3 border border-white">
            <div className="bg-teal-100 p-2 rounded-xl text-teal-600">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Wind</p>
              <p className="font-semibold text-gray-800">{weatherData.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
