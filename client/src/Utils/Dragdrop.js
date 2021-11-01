const DragdropFxn = (state, result, cb, taskId) => {
  const newColumn = [...state];
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceItems = [
      ...newColumn.find((col) => col._id === source.droppableId).todos,
    ];

    const destItems = [
      ...newColumn.find((dest) => dest._id === destination.droppableId).todos,
    ];
    const [removed] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, removed);

    const todoSource = newColumn.find((col) => col._id === source.droppableId);

    const todoDestination = newColumn.find(
      (col2) => col2._id === destination.droppableId
    );

    const todoSrc = {
      ...todoSource,
      todos: sourceItems.map((item, index) => {
        return { ...item, columnIndex: index };
      }),
    };

    const todoDesc = {
      ...todoDestination,
      todos: destItems.map((item, index) => {
        return {
          ...item,
          columnIndex: index,
          taskColumn: todoDestination._id,
        };
      }),
    };

    const newPayload = [todoSrc, todoDesc];

    cb({ taskId: taskId, cols: newPayload });
  } else {
    const newColumn = [...state];

    const columnItems = [
      ...newColumn.find((col) => col._id === source.droppableId).todos,
    ];

    const [removed] = columnItems.splice(source.index, 1);

    columnItems.splice(destination.index, 0, removed);

    const todoSource = newColumn.find((col) => col._id === source.droppableId);

    const todoSrc = {
      ...todoSource,
      todos: columnItems.map((item, index) => {
        return { ...item, columnIndex: index, taskColumn: todoSource._id };
      }),
    };

    const newPayload = [todoSrc];

    cb({ taskId: taskId, cols: newPayload });
  }
};

export default DragdropFxn;
