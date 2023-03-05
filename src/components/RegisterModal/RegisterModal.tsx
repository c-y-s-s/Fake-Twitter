import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BuildMethod from "./components/BuildMethod";
import Step1 from "./components/Step1";
import * as Styles from "./style";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";
const RegisterModal: FC = () => {
  const [step, setStep] = useState<Number>(0);

  const navigate = useNavigate();

  return (
    <Styles.Register>
      <div className="modal-container">
        <div className="top">
          <button
            className="close-button"
            onClick={() => {
              navigate("/");
            }}
          >
            <CrossSVG />
          </button>
          <TwitterSVG />
          <div></div>
        </div>
        {step === 0 && <BuildMethod setStep={setStep} />}
        {step === 1 && <Step1 />}
      </div>
    </Styles.Register>
  );
};

export default RegisterModal;
