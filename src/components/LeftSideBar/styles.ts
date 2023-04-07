import styled from "styled-components";
import { devices } from "../../styles/device";

export const LeftSideBar = styled.div`
  width: 251px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;

  @media ${devices.laptop} {
    max-width: 75px;
    justify-content: space-between;
  }

  @media ${devices.mobile} {
    position: fixed;
    flex-direction: row;
    bottom: 0;
  }
  .top-container {
    @media ${devices.laptop} {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 50px;
    }
    @media ${devices.mobile} {
      position: fixed;
      flex-direction: row;
      bottom: 0px;
    }
    .logo {
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 12px 0 0 0;
      @media ${devices.mobile} {
        display: none;
      }
      img {
        width: 38px;
        height: 38px;
      }
    }

    .link-container {
      margin: 10px 0 0 0;
      @media ${devices.mobile} {
        margin: 0;
        background-color: #fff;
        min-width: 100vw;
        display: flex;
        justify-content: space-around;
        height: 55px;
      }
      .link-item {
        display: flex;
        align-items: center;
        padding: 16px 0px;
        .icon {
          cursor: pointer;
        }
        svg {
          min-width: 26.5px;
          height: 26.5px;
        }

        a {
          font-size: ${({ theme }) => theme.fontSize.xl};
          text-decoration: none;
          color: ${({ theme }) => theme.textColor};
          padding: 0 0 0 20px;
          width: 100%;
          display: flex;
          align-items: center;

          @media ${devices.laptop} {
            display: none;
          }
        }
      }
      .link-item.messages-none {
        @media ${devices.desktop} {
          display: none;
        }
      }
      .search {
        @media ${devices.desktop} {
          display: none;
        }
      }
    }

    .send {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 27px;
      color: #fff;
      background-color: ${({ theme }) => theme.primaryColor};
      max-width: 225px;
      padding: 18px 0px;
      margin: 16px 0 0 0;
      letter-spacing: 0.25px;
      font-weight: ${({ theme }) => theme.primaryFontWeight};
      cursor: pointer;
      @media ${devices.laptop} {
        max-width: 100%;
        border-radius: 50%;
        max-width: 50px;
        max-height: 50px;
        padding: 12px 0;
        text-align: center;
      }

      @media ${devices.mobile} {
        position: fixed;
        right: 25px;
        bottom: 70px;
      }
      .send-text {
        @media ${devices.laptop} {
          display: none;
        }
      }
      .send-rwd-svg {
        width: 50px;

        svg {
          width: 24px;
          height: 24px;
          fill: #fff;
        }
        @media ${devices.desktop} {
          display: none;
        }
      }
    }
  }
  .client-data {
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 15px;

    @media ${devices.mobile} {
      position: fixed;
      left: 10px;
      bottom: 55px;
    }
    .client-data-modal {
      position: absolute;
      bottom: 75px;
      width: 290px;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0px 0px 10px #ccc;
      @media ${devices.mobile} {
        width: 140px;
        left: 8px;
      }
      .modal-item {
        padding: 6px 18px;
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    @media ${devices.laptop} {
      padding: 0;
      justify-content: center;
    }

    .client-data-container {
      width: 100%;
      padding: 0 0 0 10px;
      @media ${devices.laptop} {
        display: none;
      }
      .client-data-name {
      }
      .client-data-serial-number {
      }
    }
  }
`;
