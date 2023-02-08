import { createGlobalStyle } from "styled-components";
// 套用到整個app的樣式
const GlobalStyle = createGlobalStyle`
*{
font-family: 'Open Sans', sans-serif;


}

.font-bold{
    font-weight: 900;
}
`;

export default GlobalStyle;
