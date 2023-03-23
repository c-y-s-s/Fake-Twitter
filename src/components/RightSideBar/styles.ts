import styled from "styled-components";

export const RightSideBar = styled.div`
  margin: 0 0 0 30px;
  width: 348px;

  @media (max-width: 1020px) {
    display: none;
  }

  @media (max-width: 722px) {
    width: 100%;
    padding-right: 0px;
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
    width: 360px;
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
  .trends-container {
    position: sticky;
    top: 0;
    .trends {
      font-size: 20px;

      background-color: rgb(247, 249, 249);
      margin: 16px 0px;
      padding: 0 0 16px 0;
      border-radius: 12px;

      font-size: ${({ theme }) => theme.fontSize.xl};
      position: sticky;
      top: 0;
      .trends-title {
        padding: 16px 16px;
      }
      .trends-item {
        margin: 2px 0 0 0;
        padding: 12px 16px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          background-color: rgba(15, 20, 25, 0.05);
          transition: 0.4s;
        }
        .trends-item-name {
          color: ${({ theme }) => theme.textSecondaryColor};
        }
        .trends-item-tag {
          font-size: ${({ theme }) => theme.secondaryFontSize};
          padding: 3px 0 3px 0;
        }
        .trends-item-tweets-amount {
          color: ${({ theme }) => theme.textSecondaryColor};
        }
      }
      .show-more {
        padding: 0 16px;
        margin-top: 24px;
        color: ${({ theme }) => theme.secondaryColor};
        font-size: ${({ theme }) => theme.secondaryFontSize};
      }
    }
    .policy-text {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.textSecondaryColor};
      line-height: 16px;
    }
  }

  .no-login-style {
    border: 1px solid rgb(239, 243, 244);
    padding: 20px;
    border-radius: 12px;
    margin: 10px 0 0 0;
    .title {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
    .add-account {
      cursor: pointer;
      text-align: center;
      padding: 10px 0;
      border-radius: 24px;
      border: 1px solid #ccc;
    }
    .text {
      color: ${({ theme }) => theme.textSecondaryColor};
      font-size: 13px;
    }
  }
`;
