import React, { useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import styles from "./InputLabel.module.scss";

interface InputProps extends UseControllerProps {
  label: string;
}
const InputLabel: React.FC<InputProps> = ({ label, ...props }) => {
  const { field } = useController(props);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    field.onChange("");
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.inputLayout}>
      <label className={styles.inputLabel}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {field.value && isFocused && (
          <span className={styles.clearButton} onMouseDown={handleClear}>
            &#10006;
          </span>
        )}
      </div>
    </div>
  );
};

export default InputLabel;
