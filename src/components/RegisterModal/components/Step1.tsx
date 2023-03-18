import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as Styles from "../style";
import firebase from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useDispatch } from "react-redux";
import { setRegisterModalOpen } from "../../../reducers/controller";

const Step1: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [mailErrorMsg, setMailErrorMsg] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [registerValid, setRegisterValid] = useState<boolean>(false);
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

  function generateRandomString() {
    const length = 10;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  const handlePostRegister = (): void => {
    if (!registerValid) return;
    // 取到寫入資料必要物件
    const documentRef = firebase?.firestore()?.collection("users")?.doc();

    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, "aaaaaa")
      .then(() => {
        //傳入寫入資料的物件
        documentRef
          .set({
            mail: mail, 
            name: name,
            membershipNumber: generateRandomString(),
            birthday: `${year}-${month}-${day}`,
            // firebase 提供 time-stamp 函式可用
            created_time: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            //註冊成功資料有寫入資料庫導回首頁
            navigate("/");
            dispatch(setRegisterModalOpen(false));
          })
          .catch(() => {
            console.log("寫入資料庫失敗");
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h1>建立你的帳戶</h1>
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
        onClick={handlePostRegister}
      >
        註冊
      </div>
    </Styles.Step1>
  );
};

export default Step1;
