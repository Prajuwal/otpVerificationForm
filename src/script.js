/*
 * https://frontendeval.com/questions/code-input
 *
 * Build a usable multi-field code input
 */
const { useState, useEffect, useRef } = React;

const OTPForm = ({ digits }) => {
  const initialArray = Array.from({ length: digits }, () => "");
  const inputRef = useRef([]);
  const [otpDigits, setOtpDigits] = useState(initialArray);
  const [success, setSuccess] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const handleInputChange = (event, index) => {
    const { value } = event.target;

    setOtpDigits((prevOtpDigits) => {
      const updatedOtpDigits = [...prevOtpDigits];
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 1);
      updatedOtpDigits[index] = sanitizedValue;
      return updatedOtpDigits;
    });
    const nextIndex = index + 1;
    if (nextIndex < inputRef.current.length) {
      inputRef.current[nextIndex].focus();
    }
  };
  const handleSubmit = (event) => {
    setBtnClicked(true);

    const timeoutId = setTimeout(() => {
      setBtnClicked(false);
    }, 2000);
    event.preventDefault();
    const otp = otpDigits.join("");
    otp === "0000" ? setSuccess(true) : setSuccess(false);
    setOtpDigits(initialArray);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
 const handleKeyDown = (event, index) => {
  const { key } = event;
  const previousIndex = index - 1;

  if (key === "Backspace") {
    event.preventDefault(); 

    if (index === 0) {
     
      setOtpDigits((prevOtpDigits) => {
        const updatedOtpDigits = [...prevOtpDigits];
        updatedOtpDigits[index] = ""; 
        return updatedOtpDigits;
      });

     
      inputRef.current[index].focus();
    } else {
     
     setOtpDigits((prevOtpDigits) => {
        const updatedOtpDigits = [...prevOtpDigits];
        updatedOtpDigits[index] = ""; 
        return updatedOtpDigits;
      });
       inputRef.current[previousIndex].focus();
    }
  }
};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Please Enter your One Time Password (OTP)</h3>
        <div className="input-form">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="tel"
              ref={(el) => (inputRef.current[index] = el)}
              maxLength={1}
              pattern="[0-9]*"
              inputMode="numeric"
              value={digit}
              onChange={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          ))}
        </div>
      <button className="button">Verify OTP</button>

      </form>

      {btnClicked ? (
        success ? (
          <h3>OTP Verification Success</h3>
        ) : (
          <h3>OTP Verification Failed</h3>
        )
      ) : null}
    </>
  );
};

const App = () => {
  return <OTPForm digits={4} />;
};

ReactDOM.render(<App />, document.getElementById("app"));
