import styled from "styled-components";

const StyledDiv = styled.span`
  background-color: #d7c0ae;
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
