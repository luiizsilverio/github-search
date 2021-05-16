import { createGlobalStyle } from 'styled-components';
import github from '../assets/github.svg';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    
    body {
        background: #f0f0f5 url(${github}) no-repeat 70% top;
        -webkit-font-smoothing: antialiased !important;
        font-family: Roboto, sans-serif;
    }
    
    body, input, button {
        font-size: 16px;
    }

    #root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
