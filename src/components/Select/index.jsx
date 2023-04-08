import Select from 'react-select'
import { StyledDiv } from "./Select.styles";

const options = [
  {value: 'alojamiento', label: 'Alojamiento'},
  {value: 'comida', label: 'Comida'},
  {value: 'viajes', label: 'Viajes'},
  {value: 'bienestar', label: 'Bienestar'},
  {value: 'salud', label: 'Salud'},
  {value: 'ocio y entretenimiento', label: 'Ocio y Entretenimiento'},
  {value: 'transporte', label: 'Transporte'},
  {value: 'bienes materiales', label: 'Bienes Materiales'},
  {value: 'prestamos e inversiones', label: 'Prestamos e Inversiones'},
  ] 


const colorStyles = {
  control: (styles) => ({
    ...styles,
    height: "45px",
    width: "calc(400px * .7);",
    borderRadius: "10px",
    border: "1px solid transparent",
    margin: "10px 0 30px 0",
    fontFamily: "Barlow",
    
  }),
  option: (styles, { data }) => {
    return { ...styles, color: "#070606", height: "50%", };
  },
}

export function SelectComp({ onChange, defaultValue, value}) {
  return (
    <StyledDiv>
      <Select
        onChange={onChange}   
        defaultValue={defaultValue}
        value={value}
        onFocus={(e) => e.target.readOnly = true}
        options={options}
        styles={colorStyles}
      />
    </StyledDiv>

  );
}

