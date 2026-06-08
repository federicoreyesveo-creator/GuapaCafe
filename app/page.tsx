import Nav from "./components/Nav";
import HeroVideo from "./components/HeroVideo";
import Pasion from "./components/Pasion";
import Gallery from "./components/Gallery";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import HydrationTest from "./components/HydrationTest";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroVideo />
        <Pasion />
        <Gallery />
        <Menu />
      </main>
      <Footer />
      <HydrationTest />
    </>
  );
}
