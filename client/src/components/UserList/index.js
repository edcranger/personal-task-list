import React, { useContext } from "react";
import { useParams } from "react-router-dom";

//styles
import { UserItem, ButtonHolder, InfoHolder } from "./UserListElements";

//context
import ContributorContext from "../../context/contributors/contributorContext";
import NotificationsContext from "../../context/notifications/notificationsContext";

//components
import Avatar from "../Avatar";
import Button from "../Button";

const UserLIst = ({ user }) => {
  const { taskId } = useParams();

  const { addContributor } = useContext(ContributorContext);
  const { createNotification } = useContext(NotificationsContext);

  const addContributorHandler = () => {
    addContributor(
      {
        taskId,
        contributorId: user._id,
        full_name: user.full_name,
      },
      createNotification
    );
  };

  return (
    <UserItem key={user._id}>
      <InfoHolder>
        <Avatar name={user.full_name} />{" "}
        <h3 className="nameContainer">{user.full_name}</h3>
      </InfoHolder>
      <ButtonHolder>
        {user.status === "not invited" ? (
          <Button
            corners="10px"
            background="var(--success)"
            border="none"
            onClick={addContributorHandler}
          >
            Add
          </Button>
        ) : (
          <Button border="none">{user.status}</Button>
        )}
      </ButtonHolder>
    </UserItem>
  );
};

export default UserLIst;
