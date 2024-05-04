import React, { useEffect } from "react";
import styles from "./ActiveCards.module.scss";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { fetchUsers } from "../../redux/actions";
import UserCard from "../UserCard";
import { IUser } from "../../redux/types";

const ActiveCards = () => {
  const dispatch = useAppDispatch();

  const { loading, users, error } = useAppSelector(
    (state) => state.userReducer
  );
  // const { loading, users, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const activeUsers = users.filter((user) => user.isActive);
  const archivedUsers = users.filter((user) => !user.isActive);

  return (
    <div className={styles.activeLayout}>
      Активные:
      <div className={styles.cardsLayout}>
        {activeUsers.map((activeUser: IUser) => (
          <div key={activeUser.id}>
            {activeUser.id < 7 && (
              <UserCard loading={loading} error={error} user={activeUser} />
            )}
          </div>
        ))}
      </div>
      Архив
      <div style={{ filter: "grayscale(100%)" }} className={styles.cardsLayout}>
        {archivedUsers.map((archivedUser: IUser) => (
          <div key={archivedUser.id}>
            {archivedUser.id < 7 && (
              <UserCard loading={loading} error={error} user={archivedUser} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCards;
