import styled from "styled-components";

export const Register = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  .modal-container {
    box-sizing: border-box;
    width: 600px;
    height: 627px;
    background-color: #fff;
    padding: 16px;
    border-radius: 12px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .close-button {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
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
      font-size: 31px;
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
      padding: 6px;
      text-align: center;
      border-radius: 16px;
      margin: 40px 0;
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
  .second-text {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-top: -10px;
    color: ${({ theme }) => theme.textSecondaryColor};
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
    margin-top: 90px;
    cursor: pointer;
  }
  .register-button.false {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Step2 = styled.div`
  padding: 12px 80px 0 80px;

  .step2-title {
    font-size: 32px;
  }
  .mail-code-input {
    width: 100%;
    margin-top: 20px;
  }
  p {
    color: ${({ theme }) => theme.textSecondaryColor};
    font-size: ${({ theme }) => theme.fontSize.sm};
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
    margin-top: 300px;
    cursor: pointer;
  }
  .register-button.false {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .mail-code-error-msg {
    background-color: ${({ theme }) => theme.primaryColor};
    text-align: center;
    width: 150px;
    padding: 14px 0px;
    border-radius: 6px;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 90px;
    left: 0;
    margin: auto;
  }
`;

export const Step3 = styled.div`
  padding: 12px 80px 0 80px;

  .step3-title {
    font-size: 32px;
  }
  p {
    color: ${({ theme }) => theme.textSecondaryColor};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  .password {
    margin-top: 15px;
    width: 100%;
  }
  .error-msg {
    margin-top: 5px;
    color: red;
    font-size: 10px;
  }

  .submit-register {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: #fff;
    border-radius: 32px;
    margin-top: 300px;
    cursor: pointer;
  }
  .submit-register.false {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .none {
    display: none;
  }
`;
