import styled from "styled-components";
import { colors } from "./Light-Dark-Theme/ThemeConfig";

const StyledDiv = styled.span`
  background-color: ${colors.dark};
  color: #f2a057;
  display: flexbox;
  flex-direction: row;
  position: relative;
  top: 0px;
`;

const Header = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Header;
