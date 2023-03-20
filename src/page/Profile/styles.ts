import styled from "styled-components";

const Profile = styled.div`
  display: flex;
  justify-content: center;
  .profile-content {
    border: 1px solid rgb(239, 243, 244);
    width: 584px;
    /* padding-left: 16px; */
    .title-name {
      font-size: ${({ theme }) => theme.fontSize.xl};
      padding-left: 16px;
    }
    .post-number {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.textSecondaryColor};
      padding-left: 16px;
    }
    .user-background-img {
      margin: 6px 0 -70px 0;
      height: 200px;
      background-color: rgb(207, 217, 222);
    }
    .user-photo-data-edit {
      display: flex;
      align-items: end;
      justify-content: space-between;
      padding: 0 16px 0 16px;
      .picture {
        width: 133px;
        height: 133px;
        border: 3px solid red;
        border-radius: 50%;
      }
      .edit-profile {
        font-size: ${({ theme }) => theme.fontSize.sm};
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 16px;
        cursor: pointer;
        margin: 0 0px 20px 0;
      }
    }
    .data-container {
      padding: 16px 16px;

      .center-name {
        font-size: ${({ theme }) => theme.fontSize.xl};
      }
      .serial-number {
        font-size: ${({ theme }) => theme.fontSize.sm};
        color: ${({ theme }) => theme.textSecondaryColor};
        padding-top: 6px;
      }
      .register-date {
        font-size: ${({ theme }) => theme.fontSize.sm};
        color: ${({ theme }) => theme.textSecondaryColor};
        padding-top: 6px;
      }
      .fans-container {
        color: ${({ theme }) => theme.textSecondaryColor};
        span {
          color: black;
          padding-right: 6px;
        }
        font-size: ${({ theme }) => theme.fontSize.sm};
        padding-top: 12px;
      }
    }
    .tab-list {
      display: flex;
      align-items: center;
      font-size: ${({ theme }) => theme.secondaryFontSize};
      margin-top: 16px;
      .tab-list-item {
        width: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 0 0;

        &:hover {
          background-color: rgba(15, 20, 25, 0.1);
          transition: 0.3s;
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
  }
`;

const UserProfile = styled.div`
  padding: 0 0 8px 0;

  .infinite-scroll-component__outerdiv {
    .infinite-scroll-component {
      overflow: hidden;
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
        width: 506px;
        word-wrap: break-word;
        margin: 5px 0 0 0;
        line-height: 20px;
      }
      .other-user-image {
        margin: 14px 0 0 0;
        padding: 0 12px 0 0;
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

export { Profile, UserProfile };
