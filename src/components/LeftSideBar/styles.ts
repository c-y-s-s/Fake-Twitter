import styled from "styled-components";

export const LeftSideBar = styled.div`
  width: 251px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  @media (max-width: 1300px) {
    width: 50px;
    padding: 0px 16px;
    justify-content: space-between;
  }

  .top-container {
    @media (max-width: 1300px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .twitter-logo {
      width: 38px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 0 0 0;
      svg {
        path {
          width: 28px;
          height: 23px;
        }
      }
    }

    .link-container {
      margin: 10px 0 0 0;
      .link-item {
        display: flex;
        align-items: center;
        padding: 16px 0px;
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

          @media (max-width: 1300px) {
            display: none;
          }
        }
      }
      .search {
        @media (min-width: 1300px) {
          display: none;
        }
      }
      .explore {
        @media (max-width: 1300px) {
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
      @media (max-width: 1300px) {
        max-width: 100%;
        border-radius: 50%;
        max-width: 50px;
        max-height: 50px;
        padding: 12px 0;
        text-align: center;
      }
      .send-text {
        @media (max-width: 1300px) {
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
        @media (min-width: 1300px) {
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

    .client-data-modal {
      position: absolute;
      bottom: 75px;
      width: 290px;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0px 0px 10px #ccc;
      .modal-item {
        padding: 6px 18px;
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    @media (max-width: 1300px) {
      padding: 0;
      justify-content: center;
    }

    .client-data-container {
      width: 100%;
      padding: 0 0 0 10px;
      @media (max-width: 1300px) {
        display: none;
      }
      .client-data-name {
      }
      .client-data-serial-number {
      }
    }
  }
`;
