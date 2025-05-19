import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function Root() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-420px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
