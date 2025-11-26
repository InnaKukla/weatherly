"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useWeatherStore } from "@/app/zustand/useWeatherStore";

const Header = () => {
    const [city, setCity] = useState("");
    const { fetchWeather } = useWeatherStore();

    const fetchWeatherFunc = async (city: string): Promise<void> => {
        if (city) {
            fetchWeather(city);
        }
    };

    const handleSearch = () => {
        if (!city) return;
        fetchWeatherFunc(city);
        setCity("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
            (e.target as HTMLElement)?.blur();
        }
    };
    return (
        <header className="flex flex-col sm:flex-row gap-8 items-center justify-between mb-6 w-full">
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-[#60a5fa]/20 to-[#ffd166]/8 shadow-soft"
                    style={{ borderRadius: "10px" }}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 3v6l4 2"
                            stroke="#60a5fa"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="8" stroke="#ffd166" strokeWidth="1.2" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-[36px] leading-10 font-semibold">Weatherly</h1>
                    <p
                        className={`text-sm mt-1 ${city ? "text-[#94a3b8]" : "text-[#ffffffbd]"
                            }`}
                    >
                        Найкращий прогноз просто зараз
                    </p>
                </div>
            </div>

            <div className="flex gap-5 justify-end w-full sm:w-[60%]">
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Назва населеного пункту, країни чи регіону"
                    autoComplete="off"
                    className={`ring-1 ring-gray-300 rounded-md w-full p-2 outline-gray-300 text-[#94a3b8] ${city ? "bg-[#ffffffde]" : "bg-white"
                        }`}
                />
                <button
                    onClick={handleSearch}
                    disabled={city === ""}
                    className="cursor-pointer"
                >
                    {city ? (
                        <Image
                            src="/icons/search-white.svg"
                            alt="search icon"
                            width={24}
                            height={24}
                        />
                    ) : (
                        <Image
                            src="/icons/search-gray.svg"
                            alt="search icon"
                            width={24}
                            height={24}
                        />
                    )}
                </button>
            </div>

            {/* <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-md bg-[#0b1330]/40 backdrop-blur-sm border border-[#1f2a44] text-sm">
                    Мої локації
                </button>
                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#60a5fa]/30 to-[#7dd3fc]/18 text-sm">
                    Додати місто
                </button> #f6f0f0
            </div> */}
        </header>
    );
};

export default Header;
