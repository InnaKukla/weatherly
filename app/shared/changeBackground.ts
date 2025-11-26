import { WeatherResponse } from "./interfaces";

const bgType: Record<string, string> = {
  Clouds: "/images/cloudy2.jpg",
  Rain: "/images/rain.webp",
  Clear: "/images/clear.jpg",
  Snow: "/images/snow.jpg",
};

export const changeBackground = (weatherData: WeatherResponse | null) => {
  const main = weatherData?.currentData?.weather?.[0]?.main;
  const newBg = main ? bgType[main] : null;
  console.log(newBg);

  // let newBg: string;

  if (!newBg) {
    document.body.style.margin = "0"; // щоби градієнт був на всю сторінку
    // document.body.style.height = "100vh"; // вся висота вьюпорта
    document.body.style.background = `
  linear-gradient(
    180deg,
    #fefefe 0%,
    #f5f8ff 50%,
    #eaf0ff 100%
  )
`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    return;
  }

  const img = new Image();
  img.src = newBg;

  img.onload = () => {
    document.body.style.transition = "background 0.5s ease, opacity 0.5s ease";
    document.body.style.backgroundImage = `url(${newBg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  };
  return img;
};
