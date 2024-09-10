import React, { useEffect, useState, useCallback } from "react";
import "../Form/FormsStyles.scss";

const FormActiveSwitch = ({ props }:any) => {
  const { getValues, setValue, item } = props;
  const [active, setActive] = useState(true);
  const data=getValues(item.name)

  useEffect(() => {
    if (data === undefined || data===null ) {
      setActive(false);
    } else {
      setActive(data);
    }
  }, [data]);

  const handleSwitchChange = useCallback(() => {
    setActive(prevActive => {
      // const newValue = !prevActive ? "A" : "I";
      setValue(item.name, !prevActive);
      return !prevActive;
    });
  }, [setValue, item.name]);
  
  return (
    <div>
      <div className="m-form__input">
        {item.label && (
          <span style={{ fontSize: "12px", fontWeight: 400, paddingRight: 10 }}>
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
            style={{ fontFamily: "Roboto-Reg", textTransform: "none" }}
          >
            {item.label1 ? item.label1 : "Active"}
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
            style={{ fontFamily: "Roboto-Reg", textTransform: "none" }}
          >
            {item.label2 ? item.label2 : "In Active"}
          </label>
          <a className="slide-button btn"></a>
        </span>
      </div>
    </div>
  );
};

export default FormActiveSwitch;
