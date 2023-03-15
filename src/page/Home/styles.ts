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
  height: ${({ loginModalOpen, registerModalOpen }) =>
    loginModalOpen || registerModalOpen ? "100vh" : "100%"};
  overflow: ${({ loginModalOpen, registerModalOpen }) =>
    loginModalOpen || registerModalOpen ? "hidden" : "auto"};
  .home-content {
    border: 1px solid rgb(239, 243, 244);
    padding: 16px 0px 0 0;

    .home-content-top {
      position: sticky;
      top: 0px;
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
    .login-prompt-text {
      color: #fff;
      font-size: ${({ theme }) => theme.fontSize.sm};
      .big-text {
        font-size: 22px;
      }
    }
    .login-prompt-button {
      display: flex;
      color: #fff;
      font-size: ${({ theme }) => theme.fontSize.sm};
      .login {
        padding: 8px 14px;
        border: 1px solid #fff;
        border-radius: 20px;
        margin-right: 12px;
      }
      .register {
        padding: 8px 14px;
        border: 1px solid #fff;
        border-radius: 20px;
        color: black;
        background-color: #fff;
      }
    }
  }
`;
export const OtherUser = styled.div`
  padding: 0 0 8px 0;

  .infinite-scroll-component__outerdiv {
    .infinite-scroll-component {
      overflow: hidden;
    }
  }
  .other-user-content {
    border-bottom: 1px solid rgb(239, 243, 244);
    font-size: ${({ theme }) => theme.secondaryFontSize};
    display: flex;
    cursor: pointer;
    padding: 12px 0 12px 16px;

    &:hover {
      background-color: rgba(15, 20, 25, 0.02);
      transition: 0.3s;
    }

    .other-data-container {
      padding: 0 0 0 10px;
      .other-user-block {
        color: ${({ theme }) => theme.textSecondaryColor};
        display: flex;

        .other-user-name {
          color: ${({ theme }) => theme.textColor};
        }
        .other-user-account {
          margin: 0 3px 0 8px;
        }
        .other-user-date {
          margin: 0 0 0 3px;
        }
      }
      .other-user-text {
        width: 506px;
        word-wrap: break-word;
        margin: 5px 0 0 0;
        line-height: 20px;
      }
      .other-user-image {
        margin: 14px 0 0 0;
        padding: 0 12px 0 0;
        img {
          width: 100%;
          height: 370px;
          border-radius: 16px;
        }
      }
      .other-user-icon {
        color: ${({ theme }) => theme.textSecondaryColor};
        font-size: 13px;
        margin: 12px 0 0 0;
        width: 80%;
        display: flex;
        justify-content: space-between;

        .other-user-icon-item {
          display: flex;
          align-items: center;

          svg {
            padding: 5px;
            width: 18.75px;
            margin: 0 12px 0 0;
            fill: ${({ theme }) => theme.textSecondaryColor};
          }

          :hover {
            color: ${({ theme }) => theme.primaryColor};
            transition: 0.3s;
            svg {
              border-radius: 50%;
              transition: 0.3s;
              fill: ${({ theme }) => theme.primaryColor};
              background-color: rgba(29, 155, 240, 0.1);
            }
          }
        }

        .transfer {
          :hover {
            color: rgb(0, 186, 124);
            transition: 0.3s;
            svg {
              border-radius: 50%;
              transition: 0.3s;
              fill: rgb(0, 186, 124);
              background-color: rgba(0, 186, 124, 0.2);
            }
          }
        }
        .like {
          transition: all 0.2s;
          :hover {
            color: rgb(249, 24, 128);
            transition: 0.3s;
            svg {
              border-radius: 50%;
              transition: 0.3s;
              fill: rgb(249, 24, 128);
              background-color: rgba(249, 24, 128, 0.2);
            }
          }
          &.active {
            color: rgb(249, 24, 128);
            svg {
              fill: rgb(249, 24, 128);
            }
          }
        }
      }
    }
  }
`;
