import { StyledInput } from "./Input.styles";

export function Input({ placeholder, onChange, value }) {
  function handleChange(e) {
    onChange && onChange(e.target.value);
  }
  return (
    <StyledInput
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
}
