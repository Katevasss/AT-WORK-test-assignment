import styles from "./EditForm.module.scss";
import React, { useState } from "react";

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    { name: "profileData", label: "Данные профиля" },
    { name: "workSpace", label: "Рабочее пространство" },
    { name: "privacy", label: "Приватность" },
    { name: "security", label: "Безопасность" },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("profileData");

  const handleClick = (category: string) => {
    onSelectCategory(category);
    setActiveCategory(category);
  };
  return (
    <div className={styles.categorieslayout}>
      <img
        className={styles.avatar}
        src={require("../../assets/images/avatar_1.jpeg")}
        alt="avatar"
      />
      <div className={styles.categories}>
        {categories.map((category) => (
          <p
            key={category.name}
            className={
              activeCategory === category.name ? styles.activeCategory : ""
            }
            onClick={() => handleClick(category.name)}
          >
            {category.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
