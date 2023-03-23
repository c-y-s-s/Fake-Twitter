import React, { Dispatch, FC, SetStateAction, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import * as Styles from "../style";

interface Step2Props {
  setStep: Dispatch<SetStateAction<Number>>;
}
const Step2: FC<Step2Props> = ({ setStep }) => {
  const [mailCodeValue, setMailCodeValue] = useState("");
  const [mailCodeErrorMsg, setMailCodeErrorMsg] = useState("");
  const mailVerifyText = useSelector(
    (state: RootState) => state.registerSliceReducer.mailVerifyText
  );

  const registerData = useSelector(
    (state: RootState) => state.registerSliceReducer.registerData
  );

  const handleCheckMailVerifyText = () => {
    if (mailCodeValue.length <= 0) return;
    if (mailCodeValue === mailVerifyText) {
      setStep(3);
    } else {
      setMailCodeErrorMsg("驗證碼輸入錯誤。");

      setTimeout(() => {
        setMailCodeErrorMsg("");
      }, 3000);
    }
  };
  return (
    <Styles.Step2>
      <div className="step2-title font-bold">我們已將代碼傳送給你</div>
      <p>在下方輸入以便認證{registerData.mail}。</p>
      <TextField
        label="驗證碼"
        type="text"
        className="mail-code-input"
        value={mailCodeValue}
        onChange={(e) => {
          setMailCodeValue(e.target.value);
        }}
      />
      <div
        onClick={handleCheckMailVerifyText}
        className={`${
          mailCodeValue.length ? `register-button` : `register-button false`
        } `}
      >
        下一步
      </div>
      {mailCodeErrorMsg && (
        <div className="mail-code-error-msg">{mailCodeErrorMsg}</div>
      )}
    </Styles.Step2>
  );
};

export default Step2;
