import styled from "styled-components";
import { GlobalClientImg } from "../../styles/GlobalStyle";

interface HomeProps {
  loginModalOpen: boolean;
  registerModalOpen: boolean;
}

export const ClientImg = styled(GlobalClientImg)`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
`;
export const Home = styled.div<HomeProps>`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  @media (max-width: 722px) {
    width: 100%;
  }
  .home-content {
    height: ${({ loginModalOpen, registerModalOpen }) =>
      loginModalOpen || registerModalOpen ? "100vh" : "100%"};
    border: 1px solid rgb(239, 243, 244);
    padding: 0px 0px 0 0;

    @media (max-width: 722px) {
      width: 98%;
    }
    .home-content-top {
      position: sticky;
      top: 0;

      background-color: rgba(255, 255, 255, 0.85);
    }
    .link-title {
      font-size: ${({ theme }) => theme.fontSize.xl};
      font-weight: ${({ theme }) => theme.primaryFontWeight};
      padding: 0 0px 16px 16px;
      position: sticky;
      top: 16px;
    }
    .tab-list {
      display: flex;
      align-items: center;
      font-size: ${({ theme }) => theme.secondaryFontSize};
      margin-top: 16px;

      @media (max-width: 722px) {
        width: 100%;
      }
      .tab-list-item {
        width: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 0 0;

        &:hover {
          background-color: rgba(15, 20, 25, 0.1);
          transition: 0.3s;
        }
        .tab-list-item-text {
          display: flex;
          flex-direction: column;
          color: ${({ theme }) => theme.textSecondaryColor};
        }
        .tab-list-item-text.active {
          color: #000;
        }
        .line {
          width: 100%;
          border-radius: 20px;

          display: inline-block;
          margin-top: 16px;
        }
        .line.active {
          border-bottom: ${({ theme }) => `4px solid ${theme.primaryColor}`};
          margin-top: 12px;
        }
      }
    }
    .client-textarea-container {
    }
  }

  .login-prompt {
    background: ${({ theme }) => theme.primaryColor};
    position: fixed;
    bottom: 0px;
    height: 70px;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 0 0 200px;
    @media (max-width: 1020px) {
      padding: 0;
    }

    .login-prompt-text {
      color: #fff;
      font-size: ${({ theme }) => theme.fontSize.sm};

      @media (max-width: 722px) {
        display: none;
      }
      .big-text {
        font-size: 22px;
      }
    }
    .login-prompt-button {
      display: flex;
      color: #fff;
      font-size: ${({ theme }) => theme.fontSize.sm};

      @media (max-width: 722px) {
        width: 100%;
        text-align: center;
        padding: 0 16px;
      }
      .login {
        padding: 8px 14px;
        border: 1px solid #fff;
        border-radius: 20px;
        margin-right: 12px;
        @media (max-width: 722px) {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      .register {
        padding: 8px 14px;
        border: 1px solid #fff;
        border-radius: 20px;
        color: black;
        background-color: #fff;
        @media (max-width: 722px) {
          width: 100%;
        }
      }
    }
  }
  .home-chart-room {
    @media (max-width: 1300px) {
      display: none;
    }
  }
`;
