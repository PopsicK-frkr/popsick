import { useState } from "react";
import { useEffect } from "react";
import { navLinks } from "../utils";
import { Link } from "react-router-dom";
import popsi from "../img/popsi_logo.png";
import { contextType, Context } from "../context/ContextProvider";
import { useContext } from "react";

const Navbar: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const { state, toggle } = useContext<contextType>(Context);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleResize = () => {
    if (window.innerWidth > 640) {
      setClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="z-50 fixed flex top-0 w-full items-center justify-between p-1 bg-gradient-to-b from-[#0A0C0F] to-[#101820]">
        <div className="flex">
          <img src={popsi} alt="navbar ghost icon" className="w-20 h-20 mt-1" />
          <h1 className="ml-4 text-4xl font-bold mt-4 text-white font-Modesto">
            PopsicK
          </h1>
        </div>
        <div>
          <ul
            className={`${
              clicked
                ? "visible sm:hidden fixed top-28 right-0 -mt-6 pl-3 w-64 h-screen bg-[#101820] opacity-95"
                : "hidden sm:flex justify-between"
            }`}
          >
            {navLinks.map((link, i) => (
              <li key={i} className="px-3 sticky mb-4">
                <Link to={link.path}>
                  <div className="text-l font-Gothic font-bold text-white mt-6 hover:text-[#FEE715] hover:underline underline-offset-8 decoration-[#FEE715] transition-all transition-duration-300 transition-timing-ease-in-out">
                    {link.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:hidden" onClick={handleClick}>
          <i
            className={`text-white text-2xl cursor-pointer mt-2 ${
              clicked ? "fas fa-times" : "fas fa-bars"
            }`}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
