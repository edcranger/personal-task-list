import styled from "styled-components";

export const TaskFormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  grid-gap: 10px;

  div {
    display: flex;
    justify-content: flex-end;
  }
`;

export const TaskInput = styled.input`
  padding: 5px 15px;
  border-radius: 15px;
  font-size: var(--fontBig);
  border: 1px solid var(--darkGrey);

  :focus {
    outline: none;
    border: 1px solid #ffbf00;
  }
`;

export const TaskTextArea = styled.textarea`
  padding: 10px 15px;
  border-radius: 15px;
  font-size: var(--fontMed);

  :focus {
    outline: none;
    border: 1px solid #ffbf00;
  }
`;

export const Button = styled.button`
  min-width: 100px;
  padding: 8px 32px;
  border-radius: 10px;
  border: none;
  background: #141414;
  color: var(--white);
  font-size: var(--fontMed);
  cursor: pointer;
  margin: 0 5px;
`;

export const ClearBtn = styled.div`
  min-width: 100px;
  padding: 8px 32px;
  border-radius: 10px;
  border: none;
  background: #ffbf00;
  color: var(--white);
  font-size: var(--fontMed);
  cursor: pointer;
  margin: 0 5px;

  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

export const CategoriesForm = styled.select`
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;

  :focus {
    outline: none;
    border: 1px solid #ffbf00;
  }
`;
export const TaskFilterForm = styled.input`
  padding: 5px 15px;
  border-radius: 15px;
  font-size: var(--fontBig);
  margin: 10px 5px;

  :focus {
    outline: none;
    border: 1px solid #ffbf00;
  }
`;
