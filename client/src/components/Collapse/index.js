import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

import {
  CollapseContent,
  CollapseItemsHeader,
  CollapseCard,
} from "./CollapseElements";

const CollapseItem = ({ label, children }) => {
  const [collapse, setCollapse] = useState(false);

  const handleClick = () => setCollapse(!collapse);
  return (
    <CollapseContent>
      <CollapseItemsHeader onClick={handleClick}>
        <h4>{label}</h4>
        {collapse ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </CollapseItemsHeader>
      <CollapseCard collapse={collapse}>{children}</CollapseCard>

      {/* {React.cloneElement(children, { collapse })} */}
    </CollapseContent>
  );
};

export default CollapseItem;
