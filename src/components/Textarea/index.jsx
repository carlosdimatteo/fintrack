import { StyledTextarea } from "./Textarea.Styles";

export function Textarea({ onChange, value, placeholder }) {
    function handleChange(e) {
        onChange && onChange(e.target.value)
    } 

    return (
        <StyledTextarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    )
}