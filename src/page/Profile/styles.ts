import styled from "styled-components";

const Profile = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 721px) {
    width: 100vw;
  }

  .profile-content {
    border: 1px solid rgb(239, 243, 244);
    width: 584px;
    @media (max-width: 721px) {
      width: 98%;
    }

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
        border: 3px solid #fff;
        border-radius: 50%;
        object-fit: cover;
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

const UserEditDataModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;

  .modal-container {
    box-sizing: border-box;
    width: 600px;
    height: 627px;
    background-color: #fff;
    padding: 16px;
    border-radius: 12px;
    @media (max-width: 721px) {
      margin: 8px;
    }
    .top-container {
      width: 100%;
      height: 53px;
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        font-size: ${({ theme }) => theme.fontSize.xl};
        .close-button {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }

      .save-button {
        background-color: black;
        height: 20px;
        color: #fff;
        padding: 6px 20px;
        border-radius: 18px;
      }
    }

    .center-block {
      .user-photo-data-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px 0 16px;
        .picture {
          width: 133px;
          height: 133px;
          border: 3px solid black;
          border-radius: 50%;
          object-fit: cover;
        }
        .change-image {
          background-color: ${({ theme }) => theme.primaryColor};
          height: 20px;
          color: #fff;
          padding: 6px 20px;
          border-radius: 18px;
          margin-left: 16px;
          cursor: pointer;
        }
      }

      .name {
        margin-top: 18px;
        width: 100%;
      }
      .password {
        width: 100%;
        margin-top: 18px;
      }
    }
  }
`;

export { Profile, UserEditDataModal };
