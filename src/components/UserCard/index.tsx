import React, { useEffect, useRef, useState } from "react";
import styles from "./UserCard.module.scss";
import dots from "../../assets/images/dots.svg";
import { useDispatch } from "react-redux";
import { IUser } from "../../redux/types";
import { toggleUserStatus, deleteUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: IUser;
  loading: boolean;
  error: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, loading, error }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const toggleUser = () => {
    dispatch(toggleUserStatus(user.id));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id));
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userStatus = user.isActive ? "Архирвировать" : "Активировать";

  console.log(user.isActive);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={styles.cardLayout}>
      <div className={styles.rowGap}>
        <img
          className={styles.avatar}
          src={require("../../assets/images/avatar_1.jpeg")}
          alt="avatar"
        />
        <div className={styles.userInfo}>
          <div className={styles.columnGap}>
            <h2 className={styles.userName}>{user.username}</h2>
            <p>{user.company.name}</p>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--darkGray)" }}>
            {user.address.city}
          </p>
        </div>
      </div>
      <div
        style={{ cursor: "pointer", right: 0, position: "relative" }}
        onClick={handleToggleMenu}
      >
        <img src={dots} alt="" />
      </div>

      {isOpen && (
        <div ref={popupRef} className={styles.popupLayout}>
          <button onClick={toggleUser}>{userStatus}</button>
          <button>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/edit/${user.id}`}
            >
              Редактировать
            </Link>
          </button>
          <button onClick={handleDeleteUser}>Скрыть</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
