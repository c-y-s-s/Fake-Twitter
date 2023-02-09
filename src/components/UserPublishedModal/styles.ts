import styled from "styled-components";

export const UserPublishedModal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
  z-index: 2;
  overflow: hidden;

  .modal-container {
    width: 500px;
    height: 250px;
    background-color: #fff;
    border-radius: 12px;
  }
`;
