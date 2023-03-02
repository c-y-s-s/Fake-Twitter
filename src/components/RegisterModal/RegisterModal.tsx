import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import BuildMethod from "./components/BuildMethod";
import Step1 from "./components/Step1";



import * as Styles from "./style";
const RegisterModal: FC = () => {
  const [step, setStep] = useState<Number>(1);
  return (
    <Styles.Register>
      <div className="modal-container">
        <div className="top">
          <Link to="/">x</Link>
          <div></div>
          <div></div>
        </div>
        {step === 0 && <BuildMethod setStep={setStep} />}
        {step === 1 && <Step1 />}
      </div>
    </Styles.Register>
  );
};

export default RegisterModal;
