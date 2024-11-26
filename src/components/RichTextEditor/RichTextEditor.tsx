import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { FormRenderProps } from "../Form/FormRender";
import { Box } from "@mui/material";

const RichTextEditor = ({ props }: { props: FormRenderProps }) => {
  const editor = useRef(null);

  const config =
    // useMemo(
    {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typing...",
      removeButtons: props.item.removeButtons,
      style: {
        'font-family': 'Arial', // Default font is Arial
      },
      controls: {
        font: {
          list: {
            Arial: 'Arial', // Allow Arial
            'Rotis Semi Sans': 'Rotis Semi Sans', // Allow Rotis Semi Sans
          },
        },
      },
      defaultFont: 'Arial', // Set Arial as the default font
	  ...props.item.sx
    };
  // [placeholder]
  // );

  const handleBlur = (newContent: string) => {
    props.setValue(props.item.name, newContent);
  };
  return (
      <JoditEditor
        ref={editor}
        value={props.getValues(props.item.name)}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
  );
};
export default RichTextEditor;
