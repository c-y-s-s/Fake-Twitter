import styled from "styled-components";

export const UserPublishedModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  position: fixed;
  .modal-container {
    width: 550px;
    height: 240px;
    background-color: #fff;
    border-radius: 12px;
    margin: 50px auto 0 auto;
    padding: 0 16px 16px 16px;

    @media (max-width: 721px) {
      width: 85%;
      margin: 10px;
    }

    .modal-line {
      width: 0%;
      height: 3px;
      margin-bottom: 16px;
    }
    .modal-line.flash {
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => `${theme.primaryColor}`};
      transition: 0.65s linear;
    }
    .close-button {
      width: 30px;
      border: none;
      background-color: #fff;
    }
    .user-published-block {
      text-align: center;

      height: 100%;
    }

    // UserPublished 樣式覆寫
    .client-content-block {
      height: 100%;
      padding: 16px 0;
      border: none;

      .client-textarea-block {
        textarea {
          padding: 0 0 50px 0;
          margin: 0;
          border-bottom: 1px solid rgb(239, 243, 244);
        }
      }
      .client-textarea-bottom {
        margin-top: 50px;
      }
    }
  }
`;
