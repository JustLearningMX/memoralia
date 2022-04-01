import { BtnStyles } from './styles';

export function Button({ primary, children, handleBtn }) {
    return (        
        <BtnStyles 
            primary={primary}
            onClick={handleBtn}
        >
            {children}
        </BtnStyles>
    )
};