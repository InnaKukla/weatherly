import { WeatherCurrentProps } from "@/app/shared/interfaces";
import React from "react";

const directionsArray = [
    "Пн",
    "Пн-Сх",
    "Сх",
    "Пд-Сх",
    "Пд",
    "Пд-Зх",
    "Зх",
    "Пн-Зх",
];

const DetailsWeather: React.FC<WeatherCurrentProps> = ({ current }) => {
    if (!current) return;
    const { main, dt, sys, wind, visibility } = current;
    console.log(current);
    const visibilityMeters = visibility / 1000;
    const sunrise = sys?.sunrise;
    const sunset = sys?.sunset;
    const sunriseDate = new Date((sunrise ?? 0) * 1000);
    const sunsetDate = new Date((sunset ?? 0) * 1000);

    const direction = directionsArray[Math.round(wind?.deg / 45) % 8];

    const today = new Date();
    const todayStr = today
        .toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(" р.", "");

    const lastUpdate = new Date((dt ?? 0) * 1000); // якщо dt в секундах
    const lastUpdateStr = lastUpdate.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            {/* Right sidebar: details */}
            <aside className="lg:col-span-1">
                <div
                    className="rounded-2xl p-6"
                    style={{
                        background: "linear-gradient(180deg,#071126 0%, #020717 100%)",
                        boxShadow: "0 8px 36px rgba(1,4,14,0.6)",
                    }}
                >
                    <h4 className="text-lg font-semibold text-[#d9e9ff]">Деталі</h4>

                    <div className="mt-4 space-y-5">
                        {/* <div className="flex items-center justify-between">
                            <div className="text-sm text-[#94a3b8]">UV індекс</div>
                            <div className="font-semibold">2 (низький)</div>
                        </div> */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#94a3b8]">Схід сонця:</p>
                            <p className="text-[#d9e9ff]">
                                {sunriseDate?.toLocaleTimeString("uk-UA")}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#94a3b8]">Захід сонця:</p>
                            <p className="text-[#d9e9ff]">
                                {sunsetDate?.toLocaleTimeString("uk-UA")}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#94a3b8]">Атмосферний тиск</p>
                            <p className=" text-[#d9e9ff]">{main?.pressure} hPa</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#94a3b8]">Відчувається як:</p>
                            <p className="text-[#d9e9ff]">{Math.round(main?.feels_like)}°C</p>
                        </div>

                        <div className="flex items-center justify-between">
                            {wind?.gust ? (
                                <>
                                    {" "}
                                    <p className="text-sm text-[#94a3b8]">Пориви вітру</p>
                                    <p className="text-[#d9e9ff]">{Math.round(wind?.gust)} м/с</p>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            {" "}
                            <p className="text-sm text-[#94a3b8]">Напрямок вітру </p>
                            <p className="text-[#d9e9ff]">
                                {Math.round(wind?.deg)}° {direction}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            {" "}
                            <p className="text-sm text-[#94a3b8]">Видимість </p>
                            <p className="text-[#d9e9ff]">
                                {visibilityMeters} км
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-[#102033] my-5" />

                    <div className="text-sm text-[#94a3b8]">
                        Пн — ясна погода; Вт — легкий дощ.
                    </div>
                </div>

                {/* Small widget */}
                <div
                    className="mt-4 rounded-xl p-4 flex items-center justify-between gap-3"
                    style={{
                        background: "linear-gradient(180deg,#061022 0%, #020618 100%)",
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#0b1730]/30">
                            🌡️
                        </div>
                        <p className="text-sm text-[#94a3b8]">Останнє оновлення</p>
                    </div>
                    <p className="text-sm text-[#94a3b8] mt-1">
                        Сьогодні, {todayStr} • {lastUpdateStr}
                    </p>
                </div>
            </aside>
        </>
    );
};

export default DetailsWeather;
