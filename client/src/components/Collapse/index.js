import React from "react";

//styles
import {
  CollapseWrapper,
  CollapseItem,
  CollapseCard,
} from "./CollapseElements";

const Collapse = () => {
  return (
    <CollapseWrapper>
      <CollapseItem label="Header">
        <CollapseCard>
          <p>wew</p>
        </CollapseCard>
      </CollapseItem>
      <CollapseItem label="Header">
        <CollapseCard>
          <p>wew</p>
        </CollapseCard>
      </CollapseItem>
    </CollapseWrapper>
  );
};

export default Collapse;
