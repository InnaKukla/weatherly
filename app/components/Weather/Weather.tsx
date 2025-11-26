"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/app/zustand/useWeatherStore";
import { changeBackground } from "@/app/shared/changeBackground";
import Hero from "../Hero/Hero";
import WeatherTimes from "../WeatherTimes/WeatherTimes";
import WeatherDays from "../WeatherDays/WeatherDays";
import Loader from "../../shared/Loader/Loader";
import DetailsWeather from "../DetailsWeather/DetailsWeather";

const Weather = () => {
    const { fetchWeather, lastCity, currentWeather, error, loading } =
        useWeatherStore();
    // console.log(fetchWeather);
    console.log(lastCity);
    console.log(currentWeather);

    const current = currentWeather?.currentData;
    const forecast = currentWeather?.forecastData;
    console.log(currentWeather);
    console.log(loading);


    useEffect(() => {
        if (!error) return;
        if (error) {
            changeBackground(null);
        }
    }, [error]);

    useEffect(() => {
        if (!current) {
            changeBackground(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        console.log(lastCity);
        if (!lastCity) return;
        console.log(lastCity);

        fetchWeather(lastCity);
    }, [fetchWeather, lastCity]);

    // const fetchWeatherFunc = async (city: string): Promise<void> => {
    //     if (city) {
    //         fetchWeather(city);
    //     }
    // };
    return (
        <>
            {loading && <Loader />}
            {!error && !currentWeather && !lastCity && !loading && (
                <p className="text-center text-[34px] leading-10 font-medium mt-40">
                    Введіть населений пункт
                </p>
            )}
            {error && !loading && (
                <p className="text-center text-[34px] leading-10 font-medium mt-40">
                    Населений пункт не знайдено
                </p>
            )}
            {currentWeather && (
                <div className="mt-20 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <section>
                            <div
                                className="relative rounded-2xl p-6 md:p-8"
                                style={{
                                    background:
                                        "linear-gradient(180deg,#0f1724 0%, #071029 100%)",
                                    boxShadow: "0 12px 40px rgba(2,6,23,0.7)",
                                }}
                            >
                                {current && !error && !loading && (
                                    <>
                                        <Hero weatherData={current} error={error} />
                                        {/* Divider: margin-top md (16px) */}
                                        <div className="h-px bg-[#102033] my-5" />

                                        {/* Hourly forecast row: horizontal scroll on mobile */}
                                        <WeatherTimes forecast={forecast ?? null} />

                                        {/* Forecast grid: margin-top lg (24px) */}
                                        <WeatherDays forecast={forecast ?? null} />
                                        {/* <WeatherDescription weatherData={currentWeather} /> */}
                                        {/* Right sidebar: details */}
                                    </>
                                )}
                            </div>
                        </section>
                        <DetailsWeather current={current ?? null} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Weather;
