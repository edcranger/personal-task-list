import React, { useContext, useEffect } from "react";
import { formatDistance } from "date-fns";

//styles
import {
  NotificationWrapper,
  Headers,
  Item,
  Content,
  MainContainer,
  ButtonContainer,
} from "./NotificationsElements";

//components
import Avatar from "../Avatar";
import Button from "../Button";

//context
import ContributorContext from "../../context/contributors/contributorContext";
import NotificationsContext from "../../context/notifications/notificationsContext";

const Notifications = () => {
  const {
    notifications,
    clickSingleNotifcation,
    UpdateNotfications,
    createNotification,
  } = useContext(NotificationsContext);

  const { acceptInvite, declineInvite } = useContext(ContributorContext);

  const handleAccept = async (inv) => {
    const res = await acceptInvite(inv.contributor._id);

    if (res.success) {
      createNotification({
        type: "task-invite",
        receiver: inv.sender._id,
        contributor: inv.contributor._id,
        content: " accepted your invite for task ",
      });
      UpdateNotfications({ _id: inv._id, data: "inviteAccepted" });
    }
  };

  const handleDecline = async (inv) => {
    const res = await declineInvite(inv._id);

    if (res.success) {
      console.log(res);
      UpdateNotfications({ _id: inv._id, data: "declined" });
    }
  };

  const timeDistance = (date) => {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    });
  };

  return (
    <NotificationWrapper>
      <Headers>Notifications</Headers>
      {notifications.map((inv) => (
        <Item
          key={inv._id}
          isread={inv.isread}
          onClick={() =>
            clickSingleNotifcation({
              type: "read",
              _id: inv._id,
              read: inv.isread,
            })
          }
        >
          <MainContainer>
            <div id="avatar">
              <Avatar
                className="avatar"
                name={inv.sender.full_name ? inv.sender.full_name : "User"}
              />
            </div>
            <Content>
              <span style={{ fontWeight: "bold" }}>{inv.sender.full_name}</span>
              {inv.content}
              <span style={{ fontWeight: "bold" }}>
                {inv.type === "task-invite"
                  ? inv.contributor.task.taskTitle
                  : null}
              </span>
              <div className="time">{timeDistance(inv.createdAt)}</div>
            </Content>
          </MainContainer>

          {inv.type === "task-invite" &&
          inv.contributor.status === "pending" ? (
            <ButtonContainer>
              <Button
                background="var(--success)"
                border="none"
                w
                corners="10px"
                fontColor="white"
                onClick={() => handleAccept(inv)}
              >
                {" "}
                Accept
              </Button>
              <Button
                background="var(--danger)"
                border="none"
                corners="10px"
                fontColor="white"
                onClick={() => handleDecline(inv)}
              >
                Decline
              </Button>
            </ButtonContainer>
          ) : null}
        </Item>
      ))}
    </NotificationWrapper>
  );
};

export default Notifications;
