import { css } from "styled-components";

const theme = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
  secondaryFontSize: "15px",
  primaryColor: "#1d9bf0",
  secondaryColor: "rgb(29, 155, 240)",
  textColor: "#0f1419",
  textSecondaryColor: "#536471",
  primaryFontWeight: "900",
};

export const clientDataImg = css`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
`;

export default theme;
