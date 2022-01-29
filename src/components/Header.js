import React from "react";
import Banner from "../assets/banner.jpg";

function Header() {
  return (
    <div className="banner">
      <img src={Banner} alt="" style={{ magin: "auto", width: "100%" }} />
    </div>
  );
}

export default Header;
