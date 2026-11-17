import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Services from "./components/Services";
import Works from "./components/Works";
import { getAllWorks } from "@/lib/works";

// Works are managed from /dashboard, so this must render per-request.
export const dynamic = 'force-dynamic'

export default async function Home(){
  const works = await getAllWorks()

  return(
    <>
    <Header/>
    <About/>
    <Services/>
    <Works works={works} />
    <Contact/>
    </>

  );
}