import { notification, Tabs } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { useAppSelector } from "../redux/store";
import { setUser } from "../redux/userSlice";

function Notifications(props: { children: any }) {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var id = "";
  if (user) {
    id = user.id;
  }
  const markAllSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/mark-all-notifications-as-seen",
        { userID: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);

      toast.error("Something went wrong,try again");
    }
  };
   const deleteAll = async () => {
     try {
       dispatch(showLoading());
       const response = await axios.post(
         "/api/users/delete-all-notifications",
         { userID: id },
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       dispatch(hideLoading());
       if (response.data.success) {
         toast.success(response.data.message);
         dispatch(setUser(response.data.data));
       } else {
         toast.error(response.data.message);
       }
     } catch (error) {
       dispatch(hideLoading());
       console.log(error);

       toast.error("Something went wrong,try again");
     }
   };
  

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={markAllSeen}>
              Mark all as seen
            </h1>
          </div>
          {user
            ? user.unseenNotifications.map((notification, index) => (
                <div
                  className="card p-2"
                  onClick={() => navigate(notification.onClickPath)}
                  key={index}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))
            : null}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={deleteAll}>Delete all</h1>
          </div>
          {user
            ? user.seenNotifications.map((notification, index) => (
                <div
                  className="card p-2"
                  onClick={() => navigate(notification.onClickPath)}
                  key={index}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))
            : null}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
