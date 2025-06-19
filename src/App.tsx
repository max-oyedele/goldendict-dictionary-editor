import React, { useState, useEffect } from "react";
import MyEditorComponent from "./MyEditor";

export default function App() {
  const [value, setValue] = useState("");

  return <MyEditorComponent value={value} onValueChange={setValue} />;
}
