import { useEffect, useRef, useState } from "react";

/**
    USAGE: 

    <ToolTip title={"Amenities"} id="amenities">
        <div style={{ border: "2px solid red", padding: "10px" }}>
          Some UI tool tip element
        </div>
      </ToolTip>
 */

const ToolTip = ({ title, children, id }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  console.log(showToolTip);

  useEffect(() => {
    const onDocClick = (e) => {
      if (e.target.id === buttonRef.current.id && !showToolTip) {
        setShowToolTip((prev) => {
          return !prev;
        });
      } else setShowToolTip(false);
    };

    const onClickToolTip = (e) => {
      e.stopPropagation();
    };

    document.addEventListener("click", onDocClick);
    tooltipRef.current.addEventListener("click", onClickToolTip);

    return () => {
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <div>
      <button ref={buttonRef} id={id}>
        {title}
      </button>
      <div ref={tooltipRef}>{showToolTip && <>{children}</>}</div>
    </div>
  );
};

export default ToolTip;
