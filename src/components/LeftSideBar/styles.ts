import styled from "styled-components";

export const LeftSideBar = styled.div`
  width: 251px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  @media (max-width: 1300px) {
    width: 50px;
  }

  .top-container {
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
    }

    .tweet {
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
      @media (max-width: 1300px) {
        max-width: 100%;
      }
    }
  }
  .client-data {
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 15px;

    .client-data-container {
      width: 100%;
      padding: 0 0 0 10px;
      .client-data-name {
      }
      .client-data-serial-number {
      }
    }
  }
`;
