import React, { useEffect, useState } from "react";
import styles from "./EditForm.module.scss";
import { useAppDispatch } from "../../helpers/hooks";
import { updateUserById } from "../../redux/actions";
import { IUser } from "../../redux/types";
import { FieldValues, useForm } from "react-hook-form";
import InputLabel from "../InputLabel";
import Modal from "../Modal";
import doneIcon from "../../assets/images/done-icon.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IUserFormProps {
  userId: number;
  initialData: IUser;
}

const EditForm: React.FC<IUserFormProps> = ({ userId, initialData }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: initialData,
    mode: "onChange",
  });

  const formFields = [
    { name: "name", label: "Имя" },
    { name: "username", label: "Никнейм" },
    { name: "email", label: "Почта" },
    { name: "address.city", label: "Город" },
    { name: "phone", label: "Телефон" },
    { name: "company.name", label: "Название компании" },
  ];

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (formData: FieldValues) => {
    dispatch(updateUserById(userId, formData))
      .then(() => {
        setIsOpen(true);
        console.log("User updated successfully!", formData);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        setIsOpen(false);
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const checkNestedFieldErrors = (errors: any, fieldName: string): boolean => {
    const nestedFields = fieldName.split(".");
    let errorObj = errors;

    for (const nestedField of nestedFields) {
      errorObj = errorObj?.[nestedField];
      if (!errorObj) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={styles.layout}>
      <h2 className={styles.header}>Данные профиля</h2>
      <form className={styles.formLayout} onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <div key={field.name}>
            <InputLabel
              {...register(field.name, { required: true })}
              label={field.label}
              name={field.name}
              control={control}
            />
            {errors && checkNestedFieldErrors(errors, field.name) && (
              <span style={{ color: "red" }}>
                Поле обязательно для заполнения
              </span>
            )}
          </div>
        ))}

        <button type="submit" className={styles.submitButtom}>
          Сохранить
        </button>
      </form>
      {isOpen && (
        <Modal
          onClose={handleClose}
          message="Изменения сохранены"
          img={doneIcon}
        />
      )}
    </div>
  );
};

export default EditForm;
