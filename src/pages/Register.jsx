import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from "react";
import googleIcon from '../assets/images/google.png';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { GlobalContext } from "../context/ContextProvider";

const Register = () => {
  const {setUser} = useContext(GlobalContext);
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Get values
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {displayName, photoURL})
          .then(() => {
            toast.success("Registration Successful !!!");
          })
          .catch((error) => {
            toast.error(error.message);
          })
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }
  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        toast.success('Login Successful !!!');
      })
      .catch(error => {
        toast.error(error.code);
      })
  }
  const handlePassOnChange = e => {
    setIsActive(false);
    setErrorMsg("");
    const password = e.target.value;
    if (password) setShowEye(true)
    else setShowEye(false)

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters!");
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setErrorMsg("At least one uppercase character required!");
      return;
    }
    else if (!/[0-9]/.test(password)) {
      setErrorMsg("At least one number required!");
      return;
    }
    else if (!/[^A-Za-z0-9]/.test(password)) {
      return setErrorMsg("At least one special character required!");
    }
    setIsActive(true);
  }

  return (
    <main>
      <Helmet>
        <title>Register - StudyHub</title>
      </Helmet>

      <section>
        <div className="container">
          <div className="mt-10 max-w-[500px] mx-auto bg-gray-200 px-6 py-10 rounded-lg">
            <h2 className="text-3xl text-primary font-semibold text-center mb-10">Register your account</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="block font-semibold mb-2">Your Name</label>
              <input className="input w-full border-gray-300 mb-5" type="text" name="name" id="name" placeholder="Enter your name" required />

              <label htmlFor="photo" className="block font-semibold mb-2">Photo URL</label>
              <input className="input w-full border-gray-300 mb-5" type="text" name="photo" id="photo" placeholder="Enter your photo url" required />

              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <input className="input w-full border-gray-300 mb-5" type="email" name="email" id="email" placeholder="Enter your email address" required />

              <label htmlFor="password" className="block font-semibold mb-2">Password</label>
              <div className="relative">
                <input className="input w-full border-gray-300" onChange={handlePassOnChange} type={showPass ? "text": "password"} name="password" id="password" placeholder="Enter your password" required />
                {
                  showEye ? showPass ? <AiFillEyeInvisible className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer" onClick={() => setShowPass(!showPass)} /> : <AiFillEye className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer" onClick={() => setShowPass(!showPass)} /> : ''
                }
              </div>
              <p className="text-red-600 font-semibold mt-3">{errorMsg}</p>

              <div className="flex items-center gap-1 mt-5">
                <input className="cursor-pointer" type="checkbox" name="terms_and_conditions" id="terms_and_conditions" required />
                <label htmlFor="terms_and_conditions">Accept <Link className="text-primary font-semibold">Terms and Conditions</Link></label>
              </div>

              <button type="submit" className="btn btn-primary btn-block !rounded-md mt-5" disabled={isActive ? "" : "disabled"}>Register</button>
            </form>
            <p className="font-semibold text-center mt-5">Already have an account? <Link to='/login' className="text-primary" onClick={() => scrollTo(0, 0)}>Login</Link></p>

            <div className="flex justify-stretch items-center gap-6 my-6 w-4/5 mx-auto">
              <span className="h-[2px] bg-black flex-1"></span>
              <span className="text-[18px] font-medium">Or</span>
              <span className="h-[2px] bg-black flex-1"></span>
            </div>

            <button className="flex justify-center items-center gap-2 border-2 border-black px-4 py-2 rounded-full w-full font-medium" onClick={googleLogin}>
              <img className="w-6" src={googleIcon} alt="Google Icon" /> Login in with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;