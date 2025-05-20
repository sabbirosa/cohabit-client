import { Link } from "react-router";

const Button = ({ 
  children, 
  to, 
  onClick, 
  type = "button",
  variant = "primary", 
  size = "md", 
  className = "",
  disabled = false,
  isLoading = false,
  fullWidth = false,
}) => {
  const baseStyle = "btn";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline btn-primary",
    ghost: "btn-ghost",
    error: "btn-error",
    success: "btn-success",
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  const buttonStyle = `
    ${baseStyle} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={buttonStyle}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 