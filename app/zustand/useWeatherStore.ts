import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WeatherResponse, WeatherState } from "../shared/interfaces";
import { changeBackground } from "../shared/changeBackground";

const cacheTime = 10 * 60 * 1000;

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      weatherData: {} as WeatherState['weatherData'],
      lastCity: "",
      currentWeather: null,
      error: "",
      loading: false,

      fetchWeather: async (city: string) => {
        if (!city) return;
        const key = `weather_${city?.toLowerCase()}`;
        const cached = get().weatherData[key];
        const nowTime = Date.now();

        set({ loading: true, error: "", currentWeather: null });
        // if (cached) {
        //   set({
        //     lastCity: city,
        //     currentWeather: cached.data,
        //     loading: false,
        //     error: "",
        //   });
        //   changeBackground(cached.data);
        //   return;
        // }

        if (cached && nowTime - cached.timestamp < cacheTime) {
          set({
            lastCity: city,
            currentWeather: cached.data,
            loading: false,
            error: "",
          });
          changeBackground(cached.data);
          return;
        }
        set({ loading: true, error: "" });
        try {
          
          const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

          if (!res.ok) {
            throw new Error("Місто не знайдено");
          }
          const data: WeatherResponse = await res.json();

          set((state) => ({
            weatherData: {
              ...state.weatherData,
              [key]: { data, timestamp: nowTime },
            },
            lastCity: city,
            currentWeather: data,
            loading: false,
            error: "",
          }));
          changeBackground(data);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Помилка";
          set({
            error: message,
            loading: false,
            currentWeather: null,
            lastCity: "",
          });
        }
      },
    }),
    {
      name: "weather-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        const current = state?.currentWeather;
        if (current) {
          changeBackground(current);
        }
      },
    }
  )
);
