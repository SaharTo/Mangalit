import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Chosen = ({ opt, parentCallback }) => {
  const [selected, setSelected] = useState([]);
  //console.log(selected);
  const onTrigger = async (e) => {
    setSelected(e);
    parentCallback(e);
  };
  return (
    <div>
      <MultiSelect
        options={opt}
        value={selected}
        onChange={onTrigger}
        labelledBy="Select"
      />
    </div>
  );
};

export default Chosen;
