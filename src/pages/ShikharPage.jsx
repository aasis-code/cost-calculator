import { useEffect, useState } from "react";
import "../App.css";

import Body from "../assets/group.jpg";
import Mac from "../assets/mac.png";
import ShikharNavbar from "../components/ShikharNavbar";

export default function ShikharPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1600);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1600);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div className="shikhar-font">
        <ShikharNavbar />
      </div>

      <div className="absolute top-[100px]">
        {isLargeScreen ? (
          <img
            src={Body}
            alt="Large screen"
            className="w-full h-auto blur-[2px]"
          />
        ) : (
          <img
            src={Mac}
            alt="Small screen"
            className="w-full h-auto blur-[2px]"
          />
        )}
      </div>
    </div>
  );
}
