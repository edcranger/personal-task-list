import React from "react";

//styles
import { Wrapper, SideSection, MainSection } from "./TodoElements";

const Todo = () => {
  return (
    <Wrapper>
      <SideSection>
        <h1>Hello Side</h1>
      </SideSection>
      <MainSection>
        <h1>Hello World</h1>
      </MainSection>
    </Wrapper>
  );
};

export default Todo;
