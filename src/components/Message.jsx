import PropTypes from "prop-types";
import { X } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap/all";
import { useRef } from "react";
import { useState } from "react";
import { Ampersands } from "lucide-react";

const Message = ({ type, text, time, message, setMessage }) => {
  const timeOut = useRef();
  useEffect(() => {
    gsap.fromTo(
      ".message",
      { right: -64, opacity: 0 },
      { right: 48, opacity: 1, duration: 0.15, onComplete: ()=>{
        clearTimeout(timeOut.current)
        timeOut.current = setTimeout(()=>{
            setMessage(null)
        }, time)
      } }
    );
  }, [time, message, setMessage]);

 if(message) return (
    <div className="message fixed right-12 bottom-12 bg-dark-950 border border-dark-500 p-[1rem] py-[1.4rem] flex gap-[1rem] rounded-md border-opacity-50 text-dark-100 min-w-[15%]">
      {type == "success" ? (
        <CircleCheck color="#b0b0b0" />
      ) : (
        <Ampersands color="#b0b0b0" />
      )}
      <div>
        <span className="text-[1.6rem] font-semibold mb-[.4rem] block">
          {type == "success" ? "Sucesso!" : "Erro"}
        </span>
        <p className="text-[1.25rem] text-dark-300">{text}</p>
      </div>
    </div>
  )
};

Message.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.number,
  message: PropTypes.object,
  setMessage: PropTypes.func
};

export default Message;
