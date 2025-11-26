// import React from "react";

// interface WeatherWindProps {
//     weatherData: Weather | null;
// }
// const directionsArray = [
//     "Пн",
//     "Пн-Сх",
//     "Сх",
//     "Пд-Сх",
//     "Пд",
//     "Пд-Зх",
//     "Зх",
//     "Пн-Зх",
// ];

// const WeatherWind: React.FC<WeatherWindProps> = ({ weatherData }) => {
//     if (!weatherData) return null;
//     const { wind } = weatherData;

//     const direction = directionsArray[Math.round(wind?.deg / 45) % 8];


//     return (
//         <div className="mt-10 flex flex-col  justify-start border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94] p-[16px]">
//             {" "}
//             {wind?.gust ? (
//                 <p className="flex justify-between items-center text-white font-semibold text-xl">
//                     Пориви вітру <span>{Math.round(wind?.gust)} м/с</span>
//                 </p>
//             ) : (
//                 ""
//             )}
//             <p className="flex justify-between items-center text-white font-semibold text-xl">
//                 Напрямок вітру{" "}
//                 <span className="ml-5">
//                     {Math.round(wind?.deg)}° {direction}
//                 </span>
//             </p>
//         </div>
//     );
// };

// export default WeatherWind;
