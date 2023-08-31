import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useContext } from "react";
import { RecoveryContext } from "../../App";

const OTPInput = () => {
   const { email, otp, setPage, setOTP } = useContext(RecoveryContext);
   const [timerCount, setTimer] = React.useState(60);
   const [OTPinput, setOTPinput] = useState(new Array(6).fill(""));
   const [activeOtpIndex, setActiveOtpIndex] = useState(0);
   const [disable, setDisable] = useState(true);
   const inputRef = useRef(null)
   const navigate = useNavigate()
   let currentOtpIndex = 0
   console.log(disable)

   const resendOTP = async () => {
      try {
         if (disable) return;
         const newOTP = Math.floor(Math.random() * 900000 + 100000);
         setOTP(newOTP);
         const response = await axios.post("api/user/send_recovery_email", {
            OTP: newOTP,
            recipient_email: email,
         })
         if (response.data.success) {
            toast.success("A new OTP has succesfully been sent to your email.")
            setOTPinput([])
            setDisable(true)
            setTimer(60)
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error)
      }
   }

   function verfiyOTP() {
      if (parseInt(OTPinput.join("")) === otp) {
         setPage("reset");
         navigate("/reset")
         return;
      }
      alert(
         "The code you have entered is not correct, try again or re-send the link"
      );
      return;
   }

   const handleOnchange = ({ target }) => {
      const { value } = target;
      const newOtp = [...OTPinput]
      newOtp[currentOtpIndex] = value.substring(value.length - 1);
      if (!value) setActiveOtpIndex(currentOtpIndex - 1)
      else setActiveOtpIndex(currentOtpIndex + 1)
      setOTPinput(newOtp)
   }

   const handleOnKeyDown = (e, index) => {
      currentOtpIndex = index;
      if (e.key === "Tab") {
         e.preventDefault();
         setActiveOtpIndex(currentOtpIndex + 1);
      }
      if (e.key === "Backspace" && !e.target.value) {
         e.preventDefault();
         setActiveOtpIndex(currentOtpIndex - 1);
      }
   };

   React.useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus()
      };
      let interval = setInterval(() => {
         setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            if (lastTimerCount <= 1) setDisable(false);
            if (lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1;
         });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
   }, [disable, activeOtpIndex]);

   return (
      <div className='authentication'>
         <div className='authentication-form card p-3 d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-center">
               <h1 className='otp-card-title'>Email Verification</h1>
            </div>
            <p className="normal-text">We have send a code to your email</p>
            <div className="d-flex justify-content-center">
               {OTPinput.map((_, index) => {
                  return (
                     <div key={index} className="code-input-box">
                        <input
                           type="number" ref={index === activeOtpIndex ? inputRef : null}
                           className="num-input password-inputm-2 d-flex justify-content-center" min={0} max={9}
                           onChange={handleOnchange}
                           onKeyDown={(e) => handleOnKeyDown(e, index)}
                           value={OTPinput[index]}
                        />
                     </div>
                  );
               })}
            </div>
            <button onClick={() => verfiyOTP()}
               className="primary-button auth">
               Verify Account
            </button>
            <div className="d-flex justify-content-center">
               <p className="m-0">Didn't recieve code?</p>{" "}
               <button type="button"
                  className="forgot-btn"
                  style={{
                     color: disable ? "gray" : "blue",
                     cursor: disable ? "none" : "pointer",
                     textDecorationLine: disable ? "none" : "underline",
                  }}
                  onClick={() => resendOTP()}
               >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
               </button>
            </div>
         </div>
      </div>
   );
}

export default OTPInput