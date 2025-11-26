import { WeatherForecastProps } from "@/app/shared/interfaces";
import Image from "next/image";
import React from "react";

const WeatherTimes: React.FC<WeatherForecastProps> = ({ forecast }) => {
    if (!forecast?.list?.length) return;
    console.log(forecast);
    const nextEight = forecast?.list.slice(0, 8);
    // console.log(ooo);

    // const forecastList: ForecastItem[] = forecastData?.list;
    // console.log(forecastList);
    // const nextEight = forecastList?.slice(0, 8);

    return (
        <div className="overflow-x-auto -mx-4 px-4 py-2">
            <div className="flex gap-3" style={{ minWidth: "720px" }}>
                {/* Hour item: use padding sm (8px) */}

                {nextEight.map((item, index) => (
                    <div
                        key={item.dt}
                        className={`shrink-0 w-28 p-3 rounded-lg bg-[#071126]/30 text-center ${index === 0 && "bg-[#122448]"
                            }`}
                    >
                        <div className="text-sm text-[#d9e9ff]">
                            {item.dt_txt.split(" ")[1].slice(0, 5)}
                        </div>
                        <div className="mt-2">
                            <Image
                                src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}.png`}
                                alt={item?.weather?.[0]?.description}
                                width="44"
                                height="44"
                            />
                            {/* <svg width="28" height="28" viewBox="0 0 24 24" fill="none"> `https://openweathermap.org/img/wn/${iconCode}.png`
                                <path
                                    d="M6 14a6 6 0 1111.31-2"
                                    stroke="#FFD166"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> */}
                        </div>
                        <div className="mt-2 font-semibold text-[#d9e9ff]">
                            {Math.round(item?.main?.temp)}°C
                        </div>
                        <div className="text-sm text-[#94a3b8] mt-7">Вітер</div>
                        <div className="mt-2 font-semibold text-[#d9e9ff]">
                            {item?.wind?.speed} м/с
                        </div>
                        <div className="text-sm text-[#94a3b8] mt-7">Вологість</div>
                        <div className="mt-2 font-semibold text-[#d9e9ff]">
                            {item?.main?.humidity}%
                        </div>
                        <div className="text-sm text-[#94a3b8] mt-7">
                            {item?.weather &&
                                item?.weather?.[0].description?.charAt(0).toUpperCase() +
                                item?.weather?.[0]?.description?.slice(1)}
                        </div>
                    </div>
                ))}
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
            </div>
        </div>
    );
};

export default WeatherTimes;
