import styled from "styled-components";

export const StyledTextarea = styled.textarea`
display: block;
padding: 6px 12px;
margin: 10px 0 30px 0;
border: 1px solid transparent;
letter-spacing: .1rem;
border-radius: 10px;
font-size: 15px;
font-family: "Barlow";
height: 20%;
width: 80%;
resize: none;
transition: border 0.15s ease 0s;
:focus {
  outline: none;
  box-shadow: none;
  border: 1.5px solid  rgb(100, 153, 255);
}
`