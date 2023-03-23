import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BuildMethod from "./components/BuildMethod";
import * as Styles from "./style";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { setRegisterModalOpen } from "../../reducers/controller";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
const RegisterModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );
  const [step, setStep] = useState<Number>(0);


  return (
    <Styles.Register>
      <div className="modal-container">
        <div className="top">
          <button
            className="close-button"
            onClick={() => {
              navigate("/");
              dispatch(setRegisterModalOpen(false));
            }}
          >
            <CrossSVG />
          </button>
          <TwitterSVG />
          <div></div>
        </div>

        {step === 0 && <BuildMethod setStep={setStep} />}
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} />}
        {step === 3 && <Step3 />}
      </div>
    </Styles.Register>
  );
};

export default RegisterModal;
