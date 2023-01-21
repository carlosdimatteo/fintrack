import { StyledButton } from "./Button.styles";

export function Button({ children, type, disabled, onClick, className }) {
  return (
    <StyledButton
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
