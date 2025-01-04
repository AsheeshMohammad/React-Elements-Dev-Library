import React, { useState, useRef, useEffect } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { FormRenderProps } from "../Form/FormRender";

const RichTextEditor = ({ props }: { props: FormRenderProps }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const value = props.getValues(props.item.name);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    removeButtons: props.item.removeButtons,
    style: {
      "font-family": "Arial",
    },
    controls: {
      font: {
        list: {
          Arial: "Arial",
          // "Rotis Semi Sans": "Rotis Semi Sans",
          ...props.item?.FontFamily
        },
      },
      fontsize: {
        list: Jodit.atom(props.item.Fonts || [8, 9, 10, 11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]),
      },
    },
    defaultFont: "Arial",
    defaultFontSize: "11px",
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    hotkeys: {
      redo: "ctrl+z",
      undo: "ctrl+y,ctrl+shift+z",
      indent: "ctrl+]",
      outdent: "ctrl+[",
      bold: "ctrl+b",
      italic: "ctrl+i",
      removeFormat: "ctrl+shift+m",
      insertOrderedList: "ctrl+shift+7",
      insertUnorderedList: "ctrl+shift+8",
      openSearchDialog: "ctrl+f",
      openReplaceDialog: "ctrl+r",
    },
    events: {
      processPaste: (event, html) => {
        if (editor.current && editor.current.editor) {
          const joditEditor = editor.current.editor;
          joditEditor.selection.insertHTML(html);
          joditEditor.tempContent = joditEditor.getHTML(); // Correct method
        }
      },
      afterPaste: (event) => {
        if (editor.current && editor.current.editor) {
          const joditEditor = editor.current.editor;
          const el = document.createElement("div");
          el.innerHTML = joditEditor.tempContent
            ? joditEditor.tempContent
            : joditEditor.getHTML(); // Correct method
          joditEditor.setHTML(el.innerHTML); // Correct method
          joditEditor.tempContent = null;
        }
      },
    },
    ...props.item.sx,
  };
  

  // Update content when props value changes
  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleBlur = (newContent: string) => {
    if (newContent === "<p><br></p>") {
      setContent(newContent);
      props.setValue(props.item.name, "");
    } else {
      setContent(newContent);
      props.setValue(props.item.name, newContent);
    }
    props.item.onBlurFn && props.item.onBlurFn(newContent);
  };

  const handleChange = (newContent: string) => {
    console.log(newContent, "newContent Editor");
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // TabIndex for textarea
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
