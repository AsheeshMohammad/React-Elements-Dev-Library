import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { FormRenderProps } from "../Form/FormRender";
import { Box } from "@mui/material";

const RichTextEditor = ({ props }: { props: FormRenderProps }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
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
        fontsize: {
          list: Jodit.atom([8,9,10,11])
        }
      },
      defaultFont: 'Arial', // Set Arial as the default font
      defaultFontSize: '11px', // Set Arial as the default font
	  ...props.item.sx
    };
  // [placeholder]
  // );

  const handleBlur = (newContent: string) => {
    if(newContent==="<p><br></p>"){
      setContent(newContent);
      props.setValue(props.item.name, '');
    }else{
      setContent(newContent);
      props.setValue(props.item.name, newContent);
    }
    props.item.onBlurFn && props.item.onBlurFn(newContent)
  };

  const handleChange = (newContent: string) => {
    console.log(newContent,'newContent Editor');
    
  };
  return (
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
        onChange={handleChange}
      />
  );  
};
export default RichTextEditor;
