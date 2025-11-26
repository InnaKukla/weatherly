import { HeroProps } from "@/app/shared/interfaces";
import Image from "next/image";
import React from "react";



const Hero: React.FC<HeroProps> = ({ weatherData }) => {
    if (weatherData?.cod === "404" || !weatherData) return null;
    const { name, main, weather, wind, dt } = weatherData;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const today = new Date();
    const todayStr = today.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).replace(' р.', '');

    const lastUpdate = new Date((dt ?? 0) * 1000); // якщо dt в секундах
    const lastUpdateStr = lastUpdate.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div>
            {/* Current weather */}

            {/* Left: city and temp */}
            <div className="flex flex-col flex-wrap sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="flex flex-col ">
                    <h2 className="text-[28px] font-semibold text-[#d9e9ff]">{name}</h2>
                    <p className="text-sm text-[#94a3b8] mt-1">
                        Сьогодні, {todayStr} • Оновлено {lastUpdateStr}
                    </p>
                </div>

                {/* Current icon */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:ml-auto sm:mr-0" >
                    {/* Icon size: 72x72, margin-left 16px */}
                    <div className="flex">
                        <div className="w-[72px] h-[72px] flex items-center justify-center rounded-md bg-[#071126]/50">
                            {/* <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 14a6 6 0 1111.31-2"
                                    stroke="#FFD166"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> */}
                            <Image
                                src={iconUrl}
                                alt={weather[0].description}
                                width="44" height="44"
                            />
                        </div>
                        {/* <Image
                            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                            alt={weather[0].description}
                            width="34" height="12"
                        /> */}
                        <div>
                            <div className="text-[48px] font-bold leading-none text-[#d9e9ff]">
                                {Math.round(main?.temp)}°C
                            </div>

                            <div className="text-sm text-[#94a3b8] mt-1">
                                {weather &&
                                    weather[0].description?.charAt(0).toUpperCase() +
                                    weather[0]?.description?.slice(1)}
                            </div>
                        </div>
                    </div>

                    {/* Right: quick stats */}

                    <div className="flex gap-4 items-center">
                        <div
                            className="text-center p-3 rounded-md bg-[#071126]/40 w-[88px]"
                            style={{ minWidth: 88 }}
                        >
                            <div className="text-sm text-[#94a3b8]">Вітер</div>
                            <div className="font-semibold mt-1 text-[#d9e9ff]">
                                {wind?.speed} м/с
                            </div>
                        </div>
                        <div
                            className="text-center p-3 rounded-md bg-[#071126]/40 w-[88px]"
                            style={{ minWidth: 88 }}
                        >
                            <div className="text-sm text-[#94a3b8]">Вологість</div>
                            <div className="font-semibold mt-1 text-[#d9e9ff]">
                                {main?.humidity}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider: margin-top md (16px) */}
            {/* <div className="h-px bg-[#102033] my-5" /> */}
            {/* Hourly forecast row: horizontal scroll on mobile */}
            {/* <WeatherTimes forecastData={ } /> */}

            {/* Hourly forecast row: horizontal scroll on mobile */}
            {/* <div className="overflow-x-auto -mx-4 px-4 py-2">
                    <div className="flex gap-3" style={{ minWidth: "720px" }}> */}
            {/* Hour item: use padding sm (8px) */}
            {/* {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="shrink-0 w-28 p-3 rounded-lg bg-[#071126]/30 text-center"
                            >
                                <div className="text-sm text-[#d9e9ff]">{8 + i}:00</div>
                                <div className="mt-2">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 14a6 6 0 1111.31-2"
                                            stroke="#FFD166"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-2 font-semibold text-[#d9e9ff]">
                                    {Math.round(6 + i / 2)}°
                                </div>
                            </div>
                        ))} */}
            {/* </div>
                </div> */}

            {/* Forecast grid: margin-top lg (24px) */}
            {/* <WeatherDays /> */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4  gap-4 mt-6">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, idx) => (
                        <div
                            key={d}
                            className="p-4 rounded-md"
                            style={{
                                background: "linear-gradient(180deg,#081226 0%, #04112b 100%)",
                            }}
                        >
                            <div className="text-sm text-[#94a3b8]">{d}</div>
                            <div className="mt-2 text-lg font-semibold text-[#d9e9ff]">
                                {3 + idx}° / {-1 + idx}°
                            </div>
                            <div className="mt-2 text-sm text-[#d9e9ff]">Хмарно</div>
                        </div>
                    ))}
                </div> */}

            {/* Spacing under main card: mt-6 (24px) */}
            {/* <div className="mt-6">
                Secondary: news / tips card
                <div
                    className="rounded-xl p-6"
                    style={{
                        background: "linear-gradient(180deg,#081025 0%, #04101b 100%)",
                        boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
                    }}
                >
                    <h3 className="text-lg font-semibold text-[#d9e9ff]">Поради</h3>
                    <p className="text-sm text-[#94a3b8] mt-3">
                        Візьміть з собою легку куртку — вечорами буде холодно. І не забудьте
                        парасолю в неділю.
                    </p>
                </div>
            </div> */}
        </div>
    );

    // return (
    //     <div className={`flex flex-col items-center`}>
    //         <h2 className="text-[60px] mt-14 md:mt-16">{name}</h2>

    //         <p className="text-[74px]">{Math.round(main?.temp)}°C</p>
    //         <p className="text-[22px]">
    //             Відчувається як: {Math.round(main?.feels_like)}°C
    //         </p>
    //         <p className="text-[24px]">
    //             {weather &&
    //                 weather[0].description?.charAt(0).toUpperCase() +
    //                 weather[0]?.description?.slice(1)}
    //         </p>
    //     </div>
    // );
};

export default Hero;
