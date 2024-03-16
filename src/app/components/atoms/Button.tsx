import React from "react";
type ButtonType={
    label: string,
    onClick: () => void,
    classes?: string

}
const Button: React.FC<ButtonType>=({label, onClick, classes})=>{
    const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
        onClick();
    };
    
    return(
        <button className={classes} onClick={handleClick}>{label}</button> 
    )
}

export default Button;