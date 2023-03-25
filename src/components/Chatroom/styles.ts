import styled from "styled-components";

interface ChartRoomProps {
  isOpen: boolean;
}

const ChartRoom = styled.div<ChartRoomProps>`
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 10px #ccc;
  width: 350px;
  height: ${(props) => (props.isOpen ? "500px" : "53px")};
  right: 50px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding: 12px 12px;
  border-radius: 16px 16px 0 0;
  transition: 0.5s;

  @media (max-width: 1300px) {
    position: static;
    box-shadow: none;
    width: 586px;
  }
  .content {
    min-height: 400px;
    box-sizing: border-box;
    padding: 30px 0 0 0;
    max-height: 400px;
    overflow: auto;

    @media (max-width: 1300px) {
      min-height: 100vh;
    }

    @media (max-width: 722px) {
      min-height: 84vh;
    }
    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-button {
      background: transparent;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-track-piece {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.4);
    }

    ::-webkit-scrollbar-track {
      box-shadow: transparent;
    }
    .content-item {
      margin: 3px 0;
      .content-text {
        display: flex;
        flex-direction: column;
        justify-content: center;

        word-break: break-all;
        padding: 8px 12px;
        border-radius: 25px;
        font-size: ${({ theme }) => theme.fontSize.md};
        background-color: #ccc;
        letter-spacing: 1px;
      }
      .content-time {
        font-size: ${({ theme }) => theme.fontSize.xs};
        padding: 4px 0 0 10px;
      }
    }

    .content-item.open-ai {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    .content-item.user {
      display: flex;
      flex-direction: column;
      align-items: end;
      .content-text {
        background-color: ${({ theme }) => theme.primaryColor};
        color: #fff;
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    .message-input {
      font-size: 16px;
      width: 100%;
      background-color: #ddd;
      border-radius: 10px;
      height: 50px;
      border: none;
      &:focus {
        outline: none;
      }
    }

    .message-post-button {
      display: flex;
      border: none;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      border-radius: 50px;
      width: 100px;
      height: 30px;
      background-color: ${({ theme }) => theme.secondaryColor};
      color: #fff;
      margin: 0 0 0 6px;
      cursor: pointer;
    }

    .text-none {
      background-color: #ccc;
    }
  }
`;

export { ChartRoom };
