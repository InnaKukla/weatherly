import { ForecastItem, WeatherForecastProps } from '@/app/shared/interfaces'
import React from 'react'

const WeatherDays: React.FC<WeatherForecastProps> = ({ forecast }) => {
    if (!forecast) return null;

    const forecastList = forecast.list;


    // Сьогодні в локальній таймзоні
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const dailyTemps: Record<string, number[]> = {};
    const dailyDescription: Record<string, string[]> = {};

    forecastList?.forEach((item: ForecastItem) => {
        if (!item || !item.dt) return;
        // правильне формування дати без UTC-зсувів
        const dt = new Date(item?.dt * 1000);
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, "0");
        const d = String(dt.getDate()).padStart(2, "0");
        const date = `${y}-${m}-${d}`;

        // Пропускаємо сьогодні ДО створення ключа
        if (date === todayStr) return;

        if (!dailyTemps[date]) dailyTemps[date] = [];
        dailyTemps[date].push(item.main.temp);

        if (!dailyDescription[date]) dailyDescription[date] = [];
        dailyDescription[date].push(item.weather[0].description);
    });

    const days = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    const dailyAverage = Object.entries(dailyTemps)
        // cортуємо дні в правильному порядку
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        // обчислюємо значення
        .map(([date, temps]) => {
            const sum = temps.reduce((a, b) => a + b, 0);
            const avg = sum / temps.length;

            const descArr = dailyDescription[date] || [];
            const counts: Record<string, number> = {};
            descArr.forEach(d => {
                counts[d] = (counts[d] || 0) + 1;
            });
            const sortedDesc = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            const description = sortedDesc[0]?.[0] ?? "";

            const dayIndex = new Date(date).getDay(); // локально, без UTC
            const dayOfWeek = days[dayIndex];

            return {
                date,
                dayOfWeek,
                avgTemp: Math.round(avg * 10) / 10,
                description
            };
        })
        .slice(0, 5);




    return (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4  gap-4 mt-6">
            {dailyAverage?.map((day) => (
                <div
                    key={day.date}
                    className="p-4 rounded-md"
                    style={{
                        background: "linear-gradient(180deg,#081226 0%, #04112b 100%)",
                    }}
                >
                    <div className="text-sm text-[#94a3b8]">{day.dayOfWeek}</div>
                    <div className="mt-2 text-lg font-semibold text-[#d9e9ff]">
                        {Math.round(day.avgTemp)}°
                    </div>
                    <div className="mt-2 text-sm text-[#d9e9ff]">{day.description}</div>
                </div>
            ))}
        </div>
    )
}

export default WeatherDays
