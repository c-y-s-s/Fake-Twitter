import styled from "styled-components";
import { devices } from "../../styles/device";


export const OtherUser = styled.div`
  padding: 0 0 8px 0;

  @media ${devices.mobile} {
    width: 100%;
  }

  .infinite-scroll-component__outerdiv {
    .infinite-scroll-component {
      overflow: hidden;
      @media ${devices.mobile} {
        margin-bottom: 55px;
      }
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

    .client-data-img {
      @media ${devices.mobile} {
        width: 100%;
        height: 100%;
      }
    }
    .other-data-container {
      padding: 0 0 0 10px;
      @media ${devices.mobile} {
        width: 100%;
      }
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

        @media ${devices.mobile} {
          width: 85%;
        }
        img {
          width: 100%;
          max-width: 506px;
          max-height: 510px;
          border-radius: 16px;
          object-fit: cover;
          @media ${devices.mobile} {
            width: 100%;
            max-width: 100%;
            max-height: 100%;
          }
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
