'use server';
import Sliders from "./hero-banner/sliders";
import Navbar from "./ui/Home/navbar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Sliders/>
    </>
  );
}
