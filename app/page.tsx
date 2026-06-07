import Nav from "./components/Nav";
import HeroVideo from "./components/HeroVideo";
import Pasion from "./components/Pasion";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroVideo />
        <Pasion />
        <Menu />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
