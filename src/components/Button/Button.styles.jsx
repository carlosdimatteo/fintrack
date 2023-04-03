import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: rgb(100, 100, 255, 0.5);
  border-radius: 8px;
  border: 2px solid
    ${({ theme, disabled }) => (disabled ? "gray" : theme.colors.black)};
  padding: 8px;
  margin: 1.5rem auto;
  min-width: 4rem;
  font-weight: bold;
  box-sizing: border-box;
  max-width: 20rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  &:active {

    transform: scale(.95)
  }

  &:hover {
    opacity: 0.6;
  }
`;
