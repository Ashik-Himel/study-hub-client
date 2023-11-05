import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>StudyHub - Let&apos;s Study Together!</title>
      </Helmet>

      <FeaturesSection />
    </main>
  );
};

export default Home;