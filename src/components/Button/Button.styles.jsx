import styled from "styled-components";

export const StyledButton = styled.button`
  background: linear-gradient(137.97deg, #B2A1D6 19.88%, #4FAABE 123.6%);
  border-radius: 12px;
  border: 1px solid;
  padding: 8px;
  margin: 1.5rem auto;
  min-width: 4rem;
  letter-spacing: .2rem;
  font-weight: bold;
  box-sizing: border-box;
  max-width: 20rem;
  width: 60%;
  height: 10%;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  &:active {

    transform: scale(.95)
  }

  &:hover {
    opacity: 0.6;
  }
`;
