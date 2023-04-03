import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(100, 100, 255, 0.5);
  border-radius: 8px;
  border: 2px solid
    ${({ theme, disabled }) => (disabled ? "gray" : theme.colors.black)};
  padding: 8px;
  min-width: 5rem;
  font-weight: bold;
  box-sizing: border-box;
  max-width: 20rem;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
`;
