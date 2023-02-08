import styled from "styled-components";

export const RightSideBar = styled.div`
  margin: 0 0 0 30px;

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
      width: 316px;
      background-color: rgb(247, 249, 249);
      padding: 12px 16px;
      border-radius: 12px;
      margin: 12px 0 0 0;
      font-size: ${({ theme }) => theme.fontSize.xl};

      position: sticky;
      top: 0;
      .trends-item {
        font-size: 13px;
        margin-top: 24px;
        .trends-item-name {
          color: ${({ theme }) => theme.textSecondaryColor};
        }
        .trends-item-tag {
          font-size: ${({ theme }) => theme.secondaryFontSize};
          margin: 2px 0 0 0;
        }
        .trends-item-tweets-amount {
          color: ${({ theme }) => theme.textSecondaryColor};
          margin: 2px 0 0 0;
        }
      }
      .show-more {
        margin-top: 24px;
        color: ${({ theme }) => theme.secondaryColor};
        font-size: ${({ theme }) => theme.secondaryFontSize};
      }
    }
  }
`;
