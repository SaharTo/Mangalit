import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from "./chosen.module.css";

const Chosen = ({ opt, parentCallback }) => {
  const [selected, setSelected] = useState([]);
  const onTrigger = async (e) => {
    setSelected(e);
    parentCallback(e);
  };

  return (
    <div className={styles.multiSelect}>
      <MultiSelect
        className={styles.multi}
        options={opt}
        value={selected}
        onChange={onTrigger}
        labelledBy="Select"
        disableSearch="true"
      />
    </div>
  );
};

export default Chosen;
