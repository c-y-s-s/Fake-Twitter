import styled, { createGlobalStyle, css } from "styled-components";
import { devices } from "./device";

interface StyledClientImg {
  Location: "otherUser" | "leftSideBar" | "userPublished" | "rightSideBar";
}

// 套用到整個app的樣式
const GlobalStyle = createGlobalStyle`
*{
font-family: 'Open Sans', sans-serif;
}

.font-bold{
    font-weight: 900;
}

  .home-chart-room {
    @media ${devices.laptop} {
      display: none;
    }
  }
  
`;

export const GlobalClientImg = styled.img<StyledClientImg>`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media ${devices.mobile} {
    max-height: 40px;
    max-width: 40px;
  }
  ${(props) =>
    props.Location === "otherUser" &&
    css`
      width: 50px;
      height: 50px;
    `}
  ${(props) =>
    props.Location === "leftSideBar" &&
    css`
      min-width: 50px;
      height: 50px;
      object-fit: cover;
      @media ${devices.laptop} {
        margin: 0 0 16px 0;
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        object-fit: cover;
      }
    `}
  ${(props) =>
    props.Location === "userPublished" &&
    css`
      min-width: 48px;
      height: 48px;
      object-fit: cover;

      @media ${devices.mobile} {
        height: 40px;
        min-width: 40px;
      }
    `}

      ${(props) =>
    props.Location === "rightSideBar" &&
    css`
      max-width: 55px;
      max-height: 55px;
      border-radius: 50%;
    `}
`;
export default GlobalStyle;
