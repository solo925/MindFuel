// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store";
// import { fetchNotifications, markAsRead } from "../../store/notificationSlice";

// const Notifications: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const notifications = useSelector((state: RootState) => state.notifications);

//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   const handleMarkAsRead = (id: number) => {
//     dispatch(markAsRead(id));
//   };

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.id}>
//             <p>{notification.message}</p>
//             {!notification.read && (
//               <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
