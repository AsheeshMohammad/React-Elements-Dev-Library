import React, { useEffect, useState, useCallback } from "react";
import "../Form/FormsStyles.scss";

// interface FormActiveSwitchProps {
//   getValues: (name: string) => string;
//   setValue: (name: string, value: string) => void;
//   item: {
//     name: string;
//     label?: string;
//     label1?: string;
//     label2?: string;
//     value1?: string;
//     value2?: string;
//   };
// }

const FormActiveSwitch = ({props}:any) => {
  const [active, setActive] = useState(true);
  const { getValues, setValue, item } = props;
  const defaultValue1 = item.value1 ?? "A";
  const defaultValue2 = item.value2 ?? "I";

  useEffect(() => {
    const currentValue = getValues(item.name);
    setActive(currentValue === defaultValue1);
  }, [getValues, item.name, defaultValue1]);

  const handleSwitchChange = useCallback(() => {
    setActive(prevActive => {
      const newValue = !prevActive ? defaultValue1 : defaultValue2;
      setValue(item.name, newValue);
      return !prevActive;
    });
  }, [setValue, item.name, defaultValue1, defaultValue2]);

  return (
    <div className="m-form__input">
      {item.label && (
        <span 
          style={{ 
            fontSize: "12px", 
            fontWeight: 400, 
            paddingRight: 10 
          }}
        >
          {item.label}
        </span>
      )}
      <span className="switch prestashop-switch fixed-width-lg">
        <input
          checked={active}
          id={`${item.name}_on`}
          name={item.name}
          type="radio"
          value="Active"
          onChange={handleSwitchChange}
        />
        <label
          htmlFor={`${item.name}_on`}
          style={{ textTransform: "none" }}
        >
          {item.label1 ?? "Active"}
        </label>
        <input
          checked={!active}
          id={`${item.name}_off`}
          name={item.name}
          type="radio"
          value="In Active"
          onChange={handleSwitchChange}
        />
        <label
          htmlFor={`${item.name}_off`}
          style={{ textTransform: "none"  }}
        >
          {item.label2 ?? "In Active"}
        </label>
        <a className="slide-button btn" />
      </span>
    </div>
  );
};

export default FormActiveSwitch;
