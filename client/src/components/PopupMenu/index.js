import React, { useState } from "react";

//icons
import { BiDotsVertical, BiPencil, BiTrash } from "react-icons/bi";

//custom hooks
import useClickOutside from "../../Hooks/useClickOutside";

import {
  TaskColumnMenuContainer,
  TaskColumnMenu,
  TaskColumnMenuItem,
} from "./PopupMenuElements";

const PopupMenu = ({ col, handler }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const clickoutside = useClickOutside(() => {
    setShowMenu(false);
  });

  return (
    <TaskColumnMenuContainer>
      <BiDotsVertical id={col._id} onClick={closeMenu} />
      <TaskColumnMenu ref={clickoutside}>
        {showMenu && (
          <TaskColumnMenu>
            <TaskColumnMenuItem
              onClick={() => handler({ type: "update", col })}
            >
              <BiPencil /> Edit
            </TaskColumnMenuItem>
            <TaskColumnMenuItem
              onClick={() => handler({ type: "delete", col })}
            >
              <BiTrash />
              Delete
            </TaskColumnMenuItem>
          </TaskColumnMenu>

          /*    */
        )}
      </TaskColumnMenu>
    </TaskColumnMenuContainer>
  );
};

export default PopupMenu;
