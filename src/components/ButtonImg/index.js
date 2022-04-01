import { BtnStyles } from './styles';

export function ButtonImg({ img, children, handleBtnPlay }) {
    return (        
        <BtnStyles 
            // primary={primary}
            onClick={handleBtnPlay}
        >
            {children}
        </BtnStyles>
    )
};