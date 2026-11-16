import { Business } from "@/components/Business";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroFlight } from "@/components/HeroFlight";
import { Line } from "@/components/Line";
import { MobileCta } from "@/components/MobileCta";
import { Problems } from "@/components/Problems";
import { Ritual } from "@/components/Ritual";
import { Store } from "@/components/Store";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <HeroFlight />
        <Ritual />
        <Line />
        <Problems />
        <Store />
        <Business />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
