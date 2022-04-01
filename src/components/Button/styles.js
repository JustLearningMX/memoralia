import styled from '@emotion/styled';
// import { Button } from '@mui/material';

const bgRegular = '#f0f0f0';
const colorRegular = '#3A3845';
const hoverBgRegular = '#EEEDDE';
const activeBgColorRegular = '#E6D5B8';
const activeBorderColorRegular = '#F0A500';
const focusBxShadowRegular = '0 0 0 0.2rem rgb(100, 113, 117, .5)';

export const BtnStyles = styled.button`
    background-color: ${props => props.primary ? 'var(--bg-primary)' : bgRegular };
    border-color: ${props => props.primary ? 'var(--bg-primary)' : bgRegular };
    border: 1px solid transparent;
    color: ${props => props.primary ? '#f0f0f0' : colorRegular };
    padding: .5rem 1rem;
    cursor: pointer;
    text-transform: none;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 15px;
    min-width: 120px;
    line-height: 1.5;
    font-family: 'Quantico', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

    :hover {
        background-color: ${props => props.primary ? '#ec5555' : hoverBgRegular };
    }

    :active {
        box-shadow: none;
        background-color: ${props => props.primary ? '#e96060' : activeBgColorRegular };
        border-color: ${props => props.primary ? '#cf5a5a' : activeBorderColorRegular };
    }

    :focus {
        box-shadow: ${props => props.primary ? '0 0 0 0.2rem rgb(250, 62, 62, .5)' : focusBxShadowRegular };
    }
`