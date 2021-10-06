import styled from "styled-components";

const Input = styled.input`
  padding: 10px 15px;
  border-radius: ${({ corners }) => (corners ? corners : 0)};
  font-size: var(--fontMed);
  border: 2px solid var(--darkGrey);
  transition: all 0.2s ease-in-out;

  :focus {
    outline: none;
    border: 2px solid #2a6fe9;
  }
`;

export default Input;
