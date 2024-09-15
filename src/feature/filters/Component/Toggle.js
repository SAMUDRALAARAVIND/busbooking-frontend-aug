import { useState } from "react";
import "../style/Toggle.scss";

const Toggle = ({ className, children, title, open = false }) => {
  const [visible, setVisible] = useState(open);

  const toggleHandler = () => {
    setVisible(!visible);
  };
  return (
    <div className={className}>
      <button onClick={toggleHandler} className="header">
        <span className="title">{title}</span>
        <span className="material-icons">
          {visible ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </button>
      {visible && <>{children}</>}
    </div>
  );
};

export default Toggle;
