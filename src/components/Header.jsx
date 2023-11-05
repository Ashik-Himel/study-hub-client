import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import {FaCircleXmark, FaBars} from 'react-icons/fa6';
import HeroSection from "./home/HeroSection";

const Header = () => {
  const {user, userLoaded} = useContext(GlobalContext);
  const [drawerShow, setDrawerShow] = useState(false);
  const {pathname} = useLocation();

  return (
    <header className={`py-4 ${pathname === '/' ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="container">
        <nav className="flex justify-between items-center gap-6">
          <Link to='/' className="flex justify-center items-center gap-2">
            <img className="max-w-[30px]" src="/favicon.png" alt="Brand Icon" />
            <span className="text-2xl font-semibold"><span className="text-primary">Study</span>Hub</span>
          </Link>

          <ul className="flex flex-col xl:flex-row justify-center items-center gap-6 fixed xl:static top-0 bottom-0 bg-white xl:bg-[transparent] w-4/5 max-w-[320px] xl:w-auto xl:max-w-none [box-shadow:-10px_0px_50px_rgba(0,0,0,0.3)] xl:[box-shadow:none] transition-[right] duration-300" style={drawerShow ? {right: "0px"} : {right: "-400px"}}>
            <FaCircleXmark className="xl:hidden text-2xl text-primary absolute left-6 top-6 cursor-pointer" onClick={() => setDrawerShow(false)} />
            <li>
              <NavLink to='/' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => setDrawerShow(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/assignments' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => setDrawerShow(false)}>Assignments</NavLink>
            </li>
            {
              userLoaded && user && <>
                <li>
                  <NavLink to='/my-assignments' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => setDrawerShow(false)}>My Assignments</NavLink>
                </li>
                <li>
                  <NavLink to='/submitted-assignments' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => setDrawerShow(false)}>Submitted Assignments</NavLink>
                </li>
                <li>
                  <NavLink to='/create-assignment' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => setDrawerShow(false)}>Create Assignment</NavLink>
                </li>
              </>
            }
          </ul>

          <div className="flex justify-center items-center gap-4">
            {
              userLoaded ? user ? <div className="flex justify-center items-center gap-2">
                <img className="w-10 h-10 rounded-full border-2 border-primary" src={user?.photoURL} alt="User's Photo" />
                <button className="btn btn-warning hidden sm:inline-flex">Logout</button>
              </div> : <div className="flex justify-center items-center gap-2">
                <Link to='/login' className="btn btn-primary">Login</Link>
                <Link to='/register' className="btn btn-primary btn-outline hidden sm:inline-flex">Register</Link>
              </div> : <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-md text-primary"></span>
              </div>
            }
            <FaBars className="text-2xl xl:hidden cursor-pointer" onClick={() => setDrawerShow(true)} />
          </div>
        </nav>
      </div>
      {
        pathname === '/' && <HeroSection />
      }
    </header>
  );
};

export default Header;