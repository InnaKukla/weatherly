import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Weather from "./components/Weather/Weather";

export default function Home() {
  return (
    <div className="py-12 px-4 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Weather />
      </main>
      <Footer />
    </div>
  );
}
