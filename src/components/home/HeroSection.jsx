import { Link } from "react-router-dom";
import heroImg from '../../assets/images/hero-img.png';

const HeroSection = () => {
  return (
    <section className="py-8 md:py-4">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center [&>*]:flex-1">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.2] mb-2">Welcome to <span className="text-primary">Study</span>Hub!</h1>
            <p className="max-w-[550px]">StudyHub is an online group study based web platform, where people can took part in group study with his friends. They can create, submit, review assignments of each other in this platform.</p>
            <div className="flex items-center gap-2 mt-6">
              <Link to="/submitted-assignment" className="btn btn-primary">Get Started</Link>
              <Link to='/assignments' className="btn btn-primary btn-outline">Assignments</Link>
            </div>
          </div>

          <div>
            <img className="w-full max-w-[450px] block mx-auto" src={heroImg} alt="Hero Section Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;