import gsap from "gsap/all";
import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types"
const Title = ({ title, position }) => {
  useEffect(() => {
    gsap.fromTo(".title", { opacity: 0, x: -4 }, { opacity: 1, x:0, duration: .3 });
  }, []);
  return (
    <div
      style={{ left: position.left, top: position.top}}
      className={`title p-2 px-[12px] rounded-[12px] text-dark-950 z-3 shadow-lg bg-dark-50 absolute text-[1.3rem] font-medium`}
    >
      <span>{title}</span>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  position: PropTypes.object
}

export default Title;
