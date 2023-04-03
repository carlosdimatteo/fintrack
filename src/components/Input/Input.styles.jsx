import styled from "styled-components";

export const StyledInput = styled.input`
  display: block;
  width: 50%;
  padding: 6px 12px;
  border: 1px solid rgb(60, 63, 68);
  border-radius: 4px;
  font-size: 13px;
  height: 40px;
  transition: border 0.15s ease 0s;
  margin-right: 20px;
  :focus {
    outline: none;
    box-shadow: none;
    border-color: rgb(100, 153, 255);
  }
`;
