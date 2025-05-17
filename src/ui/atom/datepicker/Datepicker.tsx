import { useEffect, useState } from "react";
import "./style.css";
import getDatetimeToString from "../../../helpers/getDatetimeToString";

interface DatepickerComponent {
  id?: string;
  name?: string;
  valueFromParent?: number;
  hoistValue?: (value: number) => void;
}

export default function Datepicker({
  id = "daterpicker",
  name = "daterpicker",
  valueFromParent = Date.now(),
  hoistValue = () => {},
}: DatepickerComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = new Date(e.target.value).getTime();
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  return (
    <div className='daterpicker'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='datetime-local'
          value={getDatetimeToString(state)}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
