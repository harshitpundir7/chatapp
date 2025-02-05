import React, { useEffect } from "react";
import { motion } from "framer-motion";
import screenShoot from "../assets/Screenshoot.png";
import { useNavigate } from "react-router-dom";
import spongeBobImage from "../assets/pngegg.png";


function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = document.cookie.includes('token');
    console.log(token);
    if (token) {
      navigate('/chats');
    }
  }, []);

  return (
    <div className="relative">
      <div
        className="hero min-h-screen"
        style={{ backgroundColor: "rgb(5, 5, 5)" }}
      >
        <div className="hero-content flex-col lg:flex-row justify-between items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left max-w-md"
          >
            <h1 className="text-6xl font-bold" style={{ color: "white" }}>
              Talk to Talk
            </h1>
            <p className="py-6 text-xl" style={{ color: "white" }}>
              Connect seamlessly with friends and loved ones through Talk to
              Talk.
            </p>
            <button
              className="btn btn-ghost text-white hover:bg-gray-800"
              style={{ backgroundColor: "rgb(50, 50, 50)" }}
              onClick={()=> navigate('/login')}
            >
              Get Started
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mockup-phone border-primary mt-8 lg:mt-0"
          >
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <img src="https://play-lh.googleusercontent.com/ey21SzFwDygWgKaRggLUbdIyu2tglKBpFwGkLVHFmJOM8m01Oek3bi3fJ-7HVsC9XOU=w526-h296-rw" className="h-full" alt="Screenshot" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.img
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        src={spongeBobImage}
        alt="Spongebob"
        className="absolute bottom-4 right-4 w-[20%] max-w-[100px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[200px]"
      />
    </div>
  );
}

export default LandingPage;
