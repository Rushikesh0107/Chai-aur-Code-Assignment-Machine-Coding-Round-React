import React, { useState } from 'react';
import Logo from '../../assets/Logo/logo.png';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [buttonText, setButtonText] = useState('Verify Account');
  const [buttonColor, setButtonColor] = useState('bg-blue-800');
  const [inputBorderColor, setInputBorderColor] = useState('border-slate-200');
  const [verified, setVerified] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value;
    if(!(value >= 0 && value < 10) || value == '') {
        return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index >= 0) {
        if(otp[index] !== '' ) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);

            if(index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    }
  };

  const handleSubmit = () => {
    const filledOtp = otp.join('');
    if (filledOtp === '1234') {
        setVerified(true);
        //console.log(verified);
        setButtonText('Verified');
        setButtonColor('bg-green-500');
        setInputBorderColor('border-green-500');
    } else {
        setVerified(false);
        //console.log(verified);
        setButtonText('Verification Failed');
        setButtonColor('bg-red-500');
        setInputBorderColor('border-red-500');
        //setOtp(['', '', '', '']);
    }
  };

  return (
    <div
    className='w-full h-full md:h-lvh bg-[#3f8fc8] flex flex-col items-center p-5'
    >
        {/* Header */}
        
        <div
        className='w-full md:text-7xl text-3xl font-bold text-white text-center p-7 md:pb-32'
        >
            <h1>
                Chai aur Code
            </h1>
        </div>

        {/* OTP Form */}

        <div
        className='bg-white md:w-1/2 rounded-[18px]'
        >

            <div
            className='w-full flex flex-col p-10 gap-5'
            >
                <h2
                className='w-full text-center md:text-4xl text-xl font-bold'
                >
                    Mobile Phone Verification
                </h2>

                <p
                className='text-slate-400 text-center md:text-2xl'
                >
                    Enter the 4-digit verification code that was sent to your phone number.
                </p>
            </div>

            <div
            className='w-full flex justify-center items-center'
            >
                {otp.map((data, index) => {
                    return (
                        <input
                        className={`w-16 h-16 md:w-20 md:h-24 text-4xl text-center bg-slate-200 rounded-md mx-2 border-2 ${inputBorderColor}`}
                        id={`otp-input-${index}`}
                        key={index}
                        type='text'
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    );
                })}
            </div>

            <div
            className='w-full flex justify-center items-center mt-10'
            >
                <button
                className={`w-1/2 h-16 ${buttonColor} text-white text-2xl rounded-md md:w-756px md:h-514px`}
                onClick={handleSubmit}
                >
                    {buttonText} 
                </button>
            </div>
            
            <div
            className='text-center p-7 md:text-xl'
            >
                {!verified ? <p
                className='text-slate-400'
                >
                    Didn't receive the code? <a href='#' className='text-blue-500'>Resend</a>
                </p> : <p></p>}
            </div>
        </div>

        <div
        className='w-full flex justify-end p-4'
        >
            <a 
            href="https://chaicode.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="md:w-36 md:h-36 w-20 h-20 md:absolute md:bottom-10 md:right-10"
            >
                <img 
                src={Logo} 
                alt="ChaiCode Logo" 
                className='rounded-[18px]'
                />
            </a>
        </div>
    </div>
  );
};

export default OTPForm;
