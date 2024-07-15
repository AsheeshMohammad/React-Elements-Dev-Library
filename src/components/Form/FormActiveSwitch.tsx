import React, { useEffect, useState } from "react";
import "../Form/FormsStyles.scss";
const FormActiveSwitch = ({ props }: any) => {
  const [active, setActive] = useState(
    props.getValues(props.item.name)
  ); // Assuming "Active" is the default

  const handleSwitchChange = () => {
    setActive(!active);
  };
  useEffect(() => {
    props.setValue(props.item.name, active);
  }, [active]);

  return (
    <div>
      <div className="m-form__input">
        {props.item.label && <span style={{ fontSize: "12px", fontWeight: 400,paddingRight:10 }}>{props.item.label}</span>}
        <span className="switch prestashop-switch fixed-width-lg">
          <input
            checked={active}
            id={props.item.name+'_on'}
            name={props.item.name}
            type="radio"
            value="Active"
            onChange={handleSwitchChange}
          />
          <label
            htmlFor={props.item.name+'_on'}
            style={{ fontFamily: "Roboto-Reg", textTransform: "none" }}
          >
            {props.item.label1 ? props.item.label1 :'Active'}
          </label>
          <input
            id={props.item.name+'_off'}
            checked={!active}
            name={props.item.name}
            type="radio"
            value="In Active"
            onChange={handleSwitchChange}
          />
          <label
            htmlFor={props.item.name+'_off'}
            style={{ fontFamily: "Roboto-Reg", textTransform: "none" }}
          >
            {props.item.label2 ? props.item.label2 :'In Active'}
          </label>
          <a className="slide-button btn"></a>
        </span>
      </div>
    </div>
  );
};

export default FormActiveSwitch;
