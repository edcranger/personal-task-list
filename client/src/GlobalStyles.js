import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white:#fff;
        --lightGrey: #eee;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    * {
        box-sizing: border-box;
        font-family: 'Sora', sans-serif;
    }
    
    body {
        margin: 0;
        padding: 0;
        background-color:  #ffffff;
         

        h1 {
            font-size: 2rem;
            font-weight: 600
        }

        
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
    }
    }

`;
