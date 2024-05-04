import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import styles from "./EditProfilePage.module.scss";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { fetchUsers } from "../../redux/actions";
import { Link, useLocation, useParams } from "react-router-dom";
import EditForm from "../../components/EditForm";
import Categories from "../../components/EditForm/Categories";
import DisplayComponent from "../../components/DisplayComponent";
import arrowLeft from "../../assets/images/arrow-left.svg";

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { users } = useAppSelector((state) => state.userReducer);
  const { userId } = useParams<{ userId: string }>();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userIdNum = parseInt(userId!, 10);
  const user = users.find((user) => user.id === userIdNum);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={styles.layout}>
      <Link className={styles.backLink} to={location.state?.referrer || "/"}>
        <img src={arrowLeft} alt="arrow" />
        Назад
      </Link>

      <div className={styles.columnsLayout}>
        <Categories onSelectCategory={handleCategorySelect} />
        <DisplayComponent category={selectedCategory} />
      </div>
    </div>
  );
};

export default EditProfilePage;
