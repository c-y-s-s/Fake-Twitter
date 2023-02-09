import styled from "styled-components";

export const UserPublished = styled.div`
  .client-content-block {
    border-top: 1px solid rgb(239, 243, 244);
    border-bottom: 1px solid rgb(239, 243, 244);
    padding: 10px 16px;
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
          margin: 16px 0 0 0;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: ${({ theme }) => `${theme.fontSize.xl}`};
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
        cursor: pointer;
      }
    }
  }
`;
