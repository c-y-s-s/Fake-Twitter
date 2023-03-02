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


const Step1: FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  const yearOption = (): string[] => {
    let yearData = [];
    for (let i = 1983; i <= 2023; i++) {
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

  const handlePostRegister = (): void => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, "aaaaaa")
      .then((item) => {
        navigate("/");
      });
  };
  return (
    <Styles.Step1>
      <div>步驟1/5</div>
      <h1>建立你的帳戶</h1>

      <div>
        <TextField
          type="text"
          className="name"
          label="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          type="text"
          className="mail"
          label="mail"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />

        <p>出生日期</p>
        <p>
          此資訊將不會公開顯示。請確認你自己的年齡，即使此帳戶是用於公司、寵物或其他用途。
        </p>
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
                    {item}日
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
                    {item}年
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="register-button" onClick={handlePostRegister}>
        註冊
      </div>
    </Styles.Step1>
  );
};

export default Step1;
