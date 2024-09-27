import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <Spin
      style={{ display: "block", marginInline: "auto", marginBottom: "20px" }}
      indicator={
        <LoadingOutlined
          style={{ fontSize: 72, color: "hsl(8, 60%, 45%)" }}
          spin
        />
      }
    />
  );
};

export default Spinner;
