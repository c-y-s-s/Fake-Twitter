import styled from "styled-components";

export const Register = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #bbb;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-container {
    box-sizing: border-box;
    width: 600px;
    height: 627px;
    background-color: #fff;
    padding: 16px;
    border-radius: 12px;
  }
`;

export const BuildMethod = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
  }
  .center {
    width: 300px;

    margin: auto;
    .register-title {
      margin-top: 30px;
    }
    .second-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        padding: 0 8px;
      }
      .second-text-line {
        width: 100%;
        height: 1px;
        background-color: #ccc;
      }
    }

    .register-button {
      width: 100%;
      padding: 8px;
      text-align: center;
      border-radius: 16px;
      margin: 26px 0;
      cursor: pointer;
    }
    .next-step-button {
      background-color: black;
      color: #fff;
    }
    .bottom-text {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.textSecondaryColor};
      .sign-in-text {
        font-size: ${({ theme }) => theme.fontSize.sm};
        margin-top: 36px;
      }
      .sign-in-button {
        text-decoration: none;
        &:visited {
          color: ${({ theme }) => theme.primaryColor};
        }
      }
    }
  }
`;

export const Step1 = styled.div`
  padding: 0px 80px;

  .name {
    width: 100%;
    height: 56px;
  }
  .mail {
    width: 100%;
    height: 56px;
    margin-top: 24px;
  }
  .date-container {
    padding: 16px 0 0 0;
    .day-select {
      margin: 0 12px 0 12px;
      width: 110px;
    }
    .month-select {
      width: 140px;
    }
    .year-select {
      width: 130px;
    }
  }
  .register-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: #fff;
    border-radius: 32px;
    margin-top: 18px;
    cursor: pointer;
  }
`;
