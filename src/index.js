import { Button } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.less";

const App = () => {
  return <Button>test</Button>;
};

// 渲染你的 React 组件
console.log(document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<App />);
