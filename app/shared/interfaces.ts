// export interface WeatherDataType {
//   cod?: string;
//   name: string;
//   message?: string;
//   weather: [{ description: string; main: string }];
//   main: { temp: number; feels_like: number; humidity: number };
//   wind: { speed: number; deg: number; gust?: number };
//   sys?: { sunrise?: number; sunset?: number };
//   visibility: number;
//   [key: string]: unknown;
// }

export interface WeatherCurrentType {
  cod?: string;
  name: string;
  dt?: number;
  message?: string;
  weather: [{ description: string; main: string, icon: string }];
  main: { temp: number; feels_like: number; humidity: number, pressure: number };
  wind: { speed: number; deg: number; gust?: number };
  sys?: { sunrise?: number; sunset?: number };
  visibility: number;
  [key: string]: unknown;
}

export interface ForecastItem {
  dt_txt: string;
  dt?: number;
  weather: [{ description: string; main?: string, icon?: string }];
  main: { temp: number; pressure: number; humidity: number };
  wind: { speed: number};
  visibility: number;
  [key: string]: unknown;
}

export interface WeatherForecastType {
  cod?: string;
  list?: ForecastItem[];
  [key: string]: unknown;
}
export interface WeatherResponse {
  currentData: WeatherCurrentType;
  forecastData: WeatherForecastType;
}
export interface HeroProps {
  weatherData?: WeatherCurrentType | null;
  loading?: boolean;
  error: string;
}

export interface CachedWeather {
  data: WeatherResponse;
  timestamp: number;
}
export interface WeatherState {
  weatherData: Record<string, CachedWeather>;
  lastCity: string;
  currentWeather: WeatherResponse | null;
  error: string;
  loading: boolean;
  fetchWeather: (city: string) => Promise<void>;
}

export interface WeatherDataProps {
  weatherData: WeatherCurrentType | null;
}

export interface WeatherForecastProps {
  forecast: WeatherForecastType | null;
}
export interface WeatherCurrentProps {
  current: WeatherCurrentType | null;
}