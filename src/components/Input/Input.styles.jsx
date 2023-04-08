import styled from "styled-components";

export const StyledDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: calc(400px * .8);
padding: 0;
margin: 0;

`

export const StyledInput = styled.input`
  padding: 6px 12px;
  margin: 10px 20px 30px 0;
  border: 1px solid transparent;
  letter-spacing: .1rem;
  border-radius: 10px;
  font-size: 15px;
  height: 35px;
  width: 54%;
  transition: border 0.15s ease 0s;
  :focus {
    outline: none;
    box-shadow: none;
    border: 1.5px solid  rgb(100, 153, 255);
  }
`;

export const StyledCurrencyButton = styled.button`
height: 50px;
width: 17%;
border-radius: 10px;
border: 1px solid transparent;
margin: 10px 0 30px 5px;
cursor: pointer;
font-weight: bold;
`
