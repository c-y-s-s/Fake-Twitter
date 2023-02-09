import styled from "styled-components";

export const RightSideBar = styled.div`
  margin: 0 0 0 30px;
  width: 348px;
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
        padding: 8px 16px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          background-color: #ccc;
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
`;
