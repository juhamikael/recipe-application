import React from "react";

type Props = {
  type: string;
  value: string;
};

const Options: React.FC<Props> = (props) => {
  const { type, value } = props;
  return (
    <div>
      <span className="font-bold">{type}: </span>
      <span className="italic">{value}</span>
    </div>
  );
};

export default Options;
