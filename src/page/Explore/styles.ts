import styled from "styled-components";
import { devices } from "../../styles/device";

const Explore = styled.div`
  box-sizing: border-box;
  width: 586px;
  padding: 0 16px;

  @media ${devices.mobile} {
    width: 100%;
    padding-right: 0px;
  }
  .explore-list {
    @media ${devices.mobile} {
      width: 100%;
      padding-right: 0px;
    }
    .explore-item {
      color: ${({ theme }) => theme.textSecondaryColor};
      font-size: 13px;
      line-height: 20px;
      margin: 18px 0px;

      @media ${devices.mobile} {
        width: 100%;
        padding-right: 0px;
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    background-color: rgb(239, 243, 244);
    height: 42px;
    border-radius: 20px;
    margin: 5px 0 0 0;
    position: sticky;
    top: 0;
    z-index: 1;

    @media ${devices.mobile} {
      width: 96%;
    }

    .search-icon {
      padding: 4px 8px 0 16px;
      width: 18.75px;
      svg {
        fill: ${({ theme }) => theme.textSecondaryColor};
      }
    }
    input {
      height: 25px;
      width: 95%;
      border: none;
      background-color: rgba(0, 0, 0, 0);
      &:focus {
        outline: none;
      }
    }
  }
  .search-list {
    margin: 2px 0 0 0;
    width: 100%;

    border-radius: 10px;
    box-shadow: 0px 0px 10px #ccc;
    position: absolute;
    top: 45px;
    background-color: #fff;
    .search-result-container {
      text-align: center;
      padding: 10px 0px;
      height: 100%;
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.textSecondaryColor};

      .search-result-empty {
        height: 90px;
      }

      .search-result-list-item {
        padding: 12px 16px;
        display: flex;
        text-align: left;
        transition: 0.3s;
        text-decoration: none;
        cursor: pointer;
        &:hover {
          background-color: rgba(15, 20, 25, 0.02);
        }

        .search-result-content {
          margin-left: 12px;
          font-size: ${({ theme }) => theme.secondaryFontSize};
          .search-result-name {
            color: ${({ theme }) => theme.textColor};
          }
          .search-result-email,
          .search-result-follower {
            padding: 2px 0;
            color: ${({ theme }) => theme.textSecondaryColor};
          }
        }
      }

      .search-list-empty {
        text-align: left;
        color: ${({ theme }) => theme.textColor};
        font-size: ${({ theme }) => theme.fontSize.sm};
        transition: 0.3s;
        div {
          padding: 16px;
          &:hover {
            background-color: rgba(15, 20, 25, 0.02);
          }
        }
      }
    }
  }
`;

export { Explore };
