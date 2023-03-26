import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as Styles from "../style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";
import { setMailVerifyText, setRegisterData } from "../../../reducers/register";

interface Step1Props {
  setStep: Dispatch<SetStateAction<Number>>;
}

const Step1: FC<Step1Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [mailErrorMsg, setMailErrorMsg] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [registerValid, setRegisterValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const yearOption = (): string[] => {
    let yearData = [];
    for (let i = 1923; i <= 2023; i++) {
      yearData.push(i.toString());
    }

    return yearData;
  };

  const monthOption = (): string[] => {
    let monthData = [];
    for (let i = 1; i <= 12; i++) {
      monthData.push(i.toString());
    }

    return monthData;
  };

  const dayOption = (): string[] => {
    let dayData = [];
    let dayNumber = 0;

    if (
      month === "1" ||
      month === "3" ||
      month === "5" ||
      month === "7" ||
      month === "8" ||
      month === "10" ||
      month === "12"
    ) {
      dayNumber = 31;
    } else if (month === "2") {
      dayNumber = 28;
    } else {
      dayNumber = 30;
    }

    for (let i = 1; i <= dayNumber; i++) {
      dayData.push(i.toString());
    }

    return dayData;
  };

  const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
      ) &&
      value !== ""
    ) {
      setMail(value);
      setMailErrorMsg(true);
    } else {
      setMail(value);
      setMailErrorMsg(false);
    }
  };

  const mailJSX = () => {
    switch (mailErrorMsg) {
      case true:
        return (
          <TextField
            error
            type="text"
            className="mail"
            value={mail}
            onChange={handleChangeMail}
            id="outlined-error"
            label="mail"
            helperText="請輸入有效的電子郵件。"
          />
        );
      case false:
        return (
          <TextField
            type="text"
            className="mail"
            value={mail}
            onChange={handleChangeMail}
            id={mailErrorMsg ? "outlined-error" : ""}
            label="mail"
          />
        );
      default:
        return <></>;
    }
  };

  const handlePostMailVerification = (): void => {
    setIsLoading(true);
    // 把這邊的資料先存到 redux 其他元件要用
    dispatch(
      setRegisterData({
        name,
        mail,
        year,
        month,
        day,
      })
    );
    // 驗證碼邏輯
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let characters = letters + numbers;
    let randomString: string = "";
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    dispatch(setMailVerifyText(randomString));
    //發 mail 邏輯
    if (
      process.env.REACT_APP_FIREBASE_SERVICE_ID &&
      process.env.REACT_APP_FIREBASE_TEMPLATE_ID &&
      process.env.REACT_APP_FIREBASE_PUBLIC_KEY
    ) {
      emailjs
        .send(
          process.env.REACT_APP_FIREBASE_SERVICE_ID,
          process.env.REACT_APP_FIREBASE_TEMPLATE_ID,
          {
            to_name: name,
            to_email: mail,
            from_name: "Leo Chang",
            message: randomString,
          },
          process.env.REACT_APP_FIREBASE_PUBLIC_KEY
        )
        .then(() => {
          setStep(2);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // 監聽每個 input 是否都有填入正確值
  // 才可點擊註冊
  useEffect(() => {
    if (name && mail && year && month && day && !mailErrorMsg) {
      setRegisterValid(true);
    } else {
      setRegisterValid(false);
    }
  }, [day, mail, mailErrorMsg, month, name, year]);

  return (
    <Styles.Step1>
      <h1 className="step1-title">建立你的帳戶</h1>
      <div>
        <TextField
          label="name"
          type="text"
          className="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {mailJSX()}
        <div>
          <h4>出生日期</h4>
          <p className="second-text">
            此資訊將不會公開顯示。請確認你自己的年齡，即使此帳戶是用於公司、寵物或其他用途。
          </p>
        </div>

        <div className="date-container">
          <FormControl>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              className="month-select"
              value={month}
              label="month"
              onChange={(event) => {
                setMonth(event?.target?.value as string);
                setDay("");
              }}
            >
              {monthOption().map((item) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}月
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="day-select-label">day</InputLabel>
            <Select
              labelId="day-select-label"
              id="day-select"
              className="day-select"
              value={day}
              label="day"
              onChange={(event) => {
                setDay(event?.target?.value as string);
              }}
            >
              {dayOption().map((item) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              className="year-select"
              value={year}
              label="year"
              onChange={(event) => {
                setYear(event?.target?.value as string);
              }}
            >
              {yearOption().map((item) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        className={registerValid ? "register-button " : "register-button false"}
        onClick={handlePostMailVerification}
      >
        {isLoading ? (
          <ReactLoading
            type={"spokes"}
            color="#fff"
            width="25px"
            height="25px"
          />
        ) : (
          " 註冊"
        )}
      </div>
    </Styles.Step1>
  );
};

export default Step1;
