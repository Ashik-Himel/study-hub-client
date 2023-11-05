import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
};

export default Layout;