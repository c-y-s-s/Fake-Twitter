import styled from "styled-components";

export const Home = styled.div`
  display: flex;
  justify-content: center;

  .client-data-img {
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
  }

  .home-content {
    border: 1px solid rgb(239, 243, 244);
    padding: 16px 0px;

    .home-content-top {
      background-color: rgba(255, 255, 255, 0.85);
      position: sticky;
      top: 0;
    }
    .link-title {
      font-size: ${({ theme }) => theme.fontSize.xl};
      font-weight: ${({ theme }) => theme.primaryFontWeight};
      padding-left: 16px;
    }
    .tab-list {
      display: flex;
      align-items: center;
      font-size: ${({ theme }) => theme.secondaryFontSize};
      margin-top: 32px;

      .tab-list-item {
        width: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 0 0;

        &:hover {
          background-color: rgba(15, 20, 25, 0.1);
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
      border-left: none;
      border-right: none;
      padding: 0px 16px;

      .client-content-block {
        border-top: 1px solid rgb(239, 243, 244);
        border-bottom: 1px solid rgb(239, 243, 244);
        padding: 10px 0px;
        .client-textarea-block {
          display: flex;
          .client-data-img {
            min-width: 48px;
            height: 48px;
            object-fit: cover;
          }
          .textarea {
            padding: 0 0 0 10px;
            align-items: center;
            width: 100%;

            textarea {
              resize: none;
              width: 98%;
              border: none;
              height: 100%;
              &:focus {
                outline: none;
              }
            }
          }
        }

        .client-textarea-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 48px;
          .client-textarea-icon {
            display: flex;
            padding-left: 60px;

            .icon-item {
              width: 20px;
              height: 20px;

              svg {
                fill: ${({ theme }) => theme.secondaryColor};
              }

              &:nth-child(1) {
                margin: 0 6px 0 0;
              }
              &:nth-child(n + 2) {
                margin: 0px 6px;
              }
            }
          }
          .client-textarea-tweet {
            font-size: ${({ theme }) => theme.secondaryFontSize};
            border-radius: 18px;
            color: #fff;
            background-color: ${({ theme }) => theme.primaryColor};
            display: flex;
            align-items: center;
            padding: 8px 16px;
          }
        }
      }
    }

    .other-user-content {
      font-size: ${({ theme }) => theme.secondaryFontSize};
      margin: 10px 0 0 0;
      .client-data-img {
        width: 50px;
        height: 50px;
      }
      display: flex;

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
          margin: 5px 0 0 0;
        }
        .other-user-image {
          margin: 8px 0 0 0;
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
            align-items: flex-end;
            svg {
              width: 18.75px;
              margin: 0 12px 0 0;
              fill: ${({ theme }) => theme.textSecondaryColor};
            }
          }
        }
      }
    }
  }
`;
