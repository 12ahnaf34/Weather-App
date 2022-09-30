import { createGlobalStyle } from "styled-components";

export const colors = {
  dark: "#293462",
  light: "#EEEEEE",
  yellow: "#FFF80A",
  orange: "#FEB139",
  white: "#FFFFFF",
  teal: "#548CA8",
};

export const lightTheme = {
  body: colors.light,
  text: "#363537",
  toggleBorder: "#fff",
  backgroundColor: colors.light,
};

export const darkTheme = {
  body: colors.dark,
  text: "#fafafa",
  toggleBorder: "#6b8096",
  backgroundColor: colors.dark,
};

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.4s linear; 
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    font-size: 16px;
}

.Card{
  background:${({ theme }) => theme.body};
  border:${({ theme }) => theme.toggleBorder};
}
`;
