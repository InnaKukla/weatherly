/* eslint-disable @typescript-eslint/no-unused-vars */
import { WeatherCurrentType, WeatherForecastType, WeatherResponse } from "@/app/shared/interfaces";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city) return NextResponse.json({ error: "No city" }, { status: 500 });
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric&lang=uk`
    );

    if (!currentRes.ok) {
      return NextResponse.json(
        { error: "Місто не знайдено" },
        { status: currentRes.status }
      );
    }

    const currentData: WeatherCurrentType = await currentRes.json();

    
const forecastRes = await fetch(
     `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric&lang=uk`
    );
if (!forecastRes.ok) {
      return NextResponse.json(
        { error: "Не вдалось отримати прогноз" },
        { status: forecastRes.status }
      );
}
    const forecastData: WeatherForecastType = await forecastRes.json();
    const result: WeatherResponse = {
      currentData,
      forecastData
    }
    return NextResponse.json(result)
  } catch (error) {
    NextResponse.json({ error: "Не вдалося отримати погоду" });
  }
}
