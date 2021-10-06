import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white:#fff;
        --lightGrey: #eee;
        --midGrey:#5C5D5F;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
        --primary: rgba(43, 59, 234);
        --success: rgba(109, 211, 99);
        --warning: rgba(245, 181, 18);
        --danger : rgba(219, 37, 61);
        --lightBlue: rgba(191, 206, 255);
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
