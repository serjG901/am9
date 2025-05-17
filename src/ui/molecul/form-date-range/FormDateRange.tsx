import "./style.css";
import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Datepicker from "../../atom/datepicker/Datepicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

interface FormDateRangeComponent {
  period?: { start: number; end: number };
  setPeriod?: (start: number, end: number) => void;
}

export default function FormDateRange({
  period = { start: 0, end: 0 },
  setPeriod = () => {},
}: FormDateRangeComponent) {
  const [start, setStart] = useState(period.start);
  const [end, setEnd] = useState(period.end);

  const handleResetPeriod = () => {
    setStart(0);
    setEnd(0);
    setPeriod(0, 0);
  };

  useEffect(() => {
    if (start && end) setPeriod(start, end);
  }, [start, end]);

  useEffect(() => {
    if (start !== period.start) setStart(period.start);
  }, [period.start]);

  useEffect(() => {
    if (end !== period.end) setStart(period.end);
  }, [period.end]);

  return (
    <div className='form-date-range'>
      <FlexColumnCenter>
        <Collapse collapseLevel='menu' title={"period"}>
          <FlexColumnCenter>
            <Datepicker
              key='start'
              name={"start"}
              valueFromParent={start}
              hoistValue={setStart}
            />
            <Datepicker
              key='end'
              name={"end"}
              valueFromParent={end}
              hoistValue={setEnd}
            />
          </FlexColumnCenter>
        </Collapse>
        {start && end && (
          <div className='reset'>
            <ActionButton actionWithPayload={handleResetPeriod} alert>
              {"reset period"}
            </ActionButton>
          </div>
        )}
      </FlexColumnCenter>
    </div>
  );
}
