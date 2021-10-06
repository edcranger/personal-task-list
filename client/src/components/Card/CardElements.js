import styled from "styled-components";

export const Card = styled.div`
  width: ${({ width }) => (width ? width : `auto`)};
  padding: 10px;
  background: var(--white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
