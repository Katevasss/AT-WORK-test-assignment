import React, { useEffect } from "react";
import styles from "./MainPage.module.scss";
import heart from "../../assets/images/heart.svg";
import bell from "../../assets/images/bell.svg";
import UserCard from "../../components/UserCard";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { fetchUsers } from "../../redux/actions";
import { IUser } from "../../redux/types";
import logo from "../../assets/images/logo.svg";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const { loading, users, error } = useAppSelector(
    (state) => state.userReducer
  );
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const activeUsers = users.filter((user) => user.isActive);
  const archivedUsers = users.filter((user) => !user.isActive);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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

export default MainPage;
