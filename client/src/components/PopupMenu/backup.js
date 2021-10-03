import React, { useState, useEffect, useRef } from "react";

//icons
import { BiDotsVertical, BiPencil, BiTrash } from "react-icons/bi";

import {
  TaskColumnMenuContainer,
  TaskColumnMenu,
  TaskColumnMenuItem,
} from "./PopupMenuElements";

const PopupMenu = ({
  col,
  handleUpdateTaskColumn,
  handleDeleteTaskColumn,
  setActiveColMenu,
  activeColMenu,
}) => {
  const [showColumnOption, setShowColumnOption] = useState(false);

  const menuRef = useRef();

  const closeMenu = (e) => {
    console.log("wew");
    if (activeColMenu === col._id) {
      console.log(menuRef.current);
      console.log(e.target.parentElement.parentElement);
      if (menuRef.current !== e.target.parentElement.parentElement) {
        setShowColumnOption(true);
      } else {
        setShowColumnOption(false);
      }
    }

    /*     if (e.target.parentElement.id === col._id || e.target.id === col._id) {
      setShowColumnOption(true);
    } else {
      setShowColumnOption(false);
    } */
  };

  const handleOpenColumnOption = (e) => {
    setActiveColMenu(col._id);
    setShowColumnOption(true);
  };

  useEffect(() => {
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <TaskColumnMenuContainer ref={menuRef}>
      <BiDotsVertical
        id={col._id}
        className="taskColumnOptionIcon menu mena meork"
        onClick={handleOpenColumnOption}
      />

      {showColumnOption && (
        <TaskColumnMenu showColumnOption={showColumnOption}>
          <TaskColumnMenuItem onClick={() => handleUpdateTaskColumn(col)}>
            <BiPencil /> Edit
          </TaskColumnMenuItem>
          <TaskColumnMenuItem onClick={() => handleDeleteTaskColumn(col)}>
            <BiTrash />
            Delete
          </TaskColumnMenuItem>
        </TaskColumnMenu>
      )}
    </TaskColumnMenuContainer>
  );
};

export default PopupMenu;
