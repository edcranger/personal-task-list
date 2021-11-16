import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

//styles
import {
  Wrapper,
  Grid,
  BtnContainer,
  AddBtn,
  SideSection,
  MainSection,
  SearchUserWrapper,
  Item,
  ContributorName,
} from "./TaskElements";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";
import ContributorContext from "../../context/contributors/contributorContext";

//components
import TaskColumn from "../../components/TaskColumn";
import Modal from "../../components/Modal";
import Form from "../../components/Forms/Form";
import Input from "../../components/Forms/Input";
import Button from "../../components/Button";
import Collapse from "../../components/Collapse";
import Avatar from "../../components/Avatar";
import UserList from "../../components/UserList";

//hooks
import useDebounce from "../../Hooks/useDebounce";

//utils
import DragdropFxn from "../../Utils/Dragdrop";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskColumn, setTaskColumn] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");
  const [contentType, setContentType] = useState("");
  const [searchText, setSearchText] = useState("a");

  const text = useRef("");
  const { taskId } = useParams();

  const {
    currentTaskColumns,
    getAllColumns,
    addTaskColumn,
    updateTaskColumn,
    deleteTaskColumn,
    updateAllTaskColumns,
    clearColumns,
  } = useContext(TaskColumnContext);

  const { searchContributor, clearContributors, searched } =
    useContext(ContributorContext);

  const submitAddTaskColumn = (e) => {
    setError("");
    e.preventDefault();

    /*     if (!columnName) {
      return setError("Task column field is empty");
    } */

    const newColumm = {
      columnName: columnName,
      todos: [],
    };

    const payload = { taskId, newColumm };

    addTaskColumn(payload);
    setColumnName("");
    setShowModal(false);
    setError("");
  };

  const handler = ({ type, col }) => {
    if (type !== "add") {
      setTaskColumn(col);
    }
    clearContributors();
    setContentType(type);
    setShowModal(true);
    setSearchText("");
  };

  const confirmDelete = () => {
    deleteTaskColumn(taskColumn._id);
    setTaskColumn(null);
    setShowModal(false);
  };

  const handleUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    /*  setTaskCol(e.target.value); */
    setTaskColumn({ ...taskColumn, [name]: value });
  };

  const searchUserHandler = (e) => {
    text.current.value !== ""
      ? setSearchText(e.target.value)
      : setSearchText("");
  };

  useDebounce(() => searchContributor({ taskId, searchText }), 1000, [
    searchText,
  ]);

  const onUpdateSubmit = (e) => {
    e.preventDefault();

    updateTaskColumn(taskColumn);
  };

  const onDragEnd = (result) => {
    DragdropFxn(currentTaskColumns, result, updateAllTaskColumns, taskId);
  };

  useEffect(() => {
    getAllColumns(taskId);
    return () => {
      setShowModal(false);
      setContentType("");
      clearColumns();
    };
  }, [taskId, getAllColumns]);

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <SideSection>
        <Collapse label="Categories">
          <Link to="/">
            <h4>Programming</h4>
          </Link>
          <Link to="/">
            <h4>Utilities</h4>
          </Link>
        </Collapse>

        <Collapse label="Contributors">
          <Button
            border="none"
            hoverFontColor="var(--success)"
            onClick={() => handler({ type: "addContributor" })}
          >
            <AiOutlineUsergroupAdd size="20" corners="20" />
            Add Contributor
          </Button>
          <Item>
            <Avatar name="Edison Ocampo" />{" "}
            <ContributorName>Edison Ocampo</ContributorName>
          </Item>
          <Item>
            <Avatar name="Mae Anne Tribunal" />{" "}
            <ContributorName>Mae Anne Tribunal</ContributorName>
          </Item>
        </Collapse>
      </SideSection>
      <MainSection>
        {error && <h1>{error}</h1>}
        {currentTaskColumns && (
          <Grid>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {currentTaskColumns.map((col) => {
                return <TaskColumn key={col._id} col={col} handler={handler} />;
              })}
            </DragDropContext>

            <BtnContainer>
              <AddBtn onClick={() => handler({ type: "add" })} />
            </BtnContainer>
          </Grid>
        )}
      </MainSection>

      {/* ======================MODAL AREA======================= */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {contentType === "add" && (
          <Form onSubmit={submitAddTaskColumn}>
            <Input
              width="100%"
              corners="10px"
              placeholder="Column Name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />

            <BtnContainer>
              <Button hoverColor="var(--success)" border="none" type="submit">
                Create Column
              </Button>
            </BtnContainer>
          </Form>
        )}

        {contentType === "update" && (
          <Form onSubmit={onUpdateSubmit}>
            <Input
              type="text"
              name="columnName"
              value={taskColumn.columnName}
              onChange={handleUpdate}
              width="100%"
              corners="10px"
            />
          </Form>
        )}

        {contentType === "delete" && (
          <div>
            <h3>Are you sure you want to delete this todo?</h3>
            <Button
              border="none"
              hoverColor="var(--danger)"
              onClick={confirmDelete}
            >
              Yes
            </Button>

            <Button
              border="none"
              hoverColor="var(--warning)"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        )}

        {contentType === "addContributor" && (
          <div>
            <SearchUserWrapper>
              <Input
                corners="10px"
                placeholder="Member Id or Name"
                width="100%"
                onChange={searchUserHandler}
                ref={text}
                type={text}
              />
            </SearchUserWrapper>

            {searched
              ? searched.map((user) => <UserList key={user._id} user={user} />)
              : null}
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default Task;
