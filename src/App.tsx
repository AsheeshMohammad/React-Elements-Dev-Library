import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FormRenderWrapper from "./components/Form/FormRenderWrapper";
import { FormSectionPropsItem } from "./components/Form/FormRender";

function App() {
  const form:FormSectionPropsItem[]=[
    {
      name:'userName',
      label:'User Name',
      inputType:'text'
    },
    {
      name:'password',
      label:'Password',
      inputType:'number'
    },
  ]
  return (
    <>
    Hii
    </>
  );
}

export default App;
