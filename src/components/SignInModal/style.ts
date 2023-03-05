import styled from "styled-components";

export const SignInModal = styled.div`
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
    .center {
      width: 300px;

      margin: auto;
      .sign-in-title {
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
      .sign-in-input {
        border: 1px solid rgb(207, 217, 222);
        padding: 16px 0px;
        width: 100%;
      }
      .sign-in-button {
        width: 100%;
        height: 34px;
        text-align: center;
        border-radius: 16px;
        margin: 26px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .next-step-button {
        background-color: black;
        color: #fff;
      }
      .forget-password {
        border: 1px solid rgb(207, 217, 222);
      }
      .bottom {
        letter-spacing: 0.5px;
        font-size: ${({ theme }) => theme.fontSize.sm};
        .register-text {
          padding: 0 0 0 4px;
          text-decoration: none;
          &:visited {
            color: ${({ theme }) => theme.primaryColor};
          }
        }
      }
    }
  }
`;

export const SignInStep1 = styled.div`
  padding: 0 90px;
  .step1-mail {
    width: 100%;
  }
  .step1-password {
    margin-top: 20px;
    width: 100%;
  }
  .step1-sign-in {
    width: 100%;
    padding: 16px 0px;
    text-align: center;
    border-radius: 24px;
    margin: 26px 0;
    background-color: #ccc;
  }
`;
