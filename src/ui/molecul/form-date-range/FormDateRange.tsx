import "./style.css";
import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Datepicker from "../../atom/datepicker/Datepicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

interface FormDateRangeComponent {
  period?: { start: number | null; end: number | null };
  setPeriod?: (start: number | null, end: number | null) => void;
}

export default function FormDateRange({
  period = { start: 0, end: 0 },
  setPeriod = () => {},
}: FormDateRangeComponent) {
  const [start, setStart] = useState(period.start);
  const [end, setEnd] = useState(period.end);

  const handleResetPeriod = () => {
    setStart(null);
    setEnd(null);
    setPeriod(null, null);
  };

  useEffect(() => {
    if (start !== null && end !== null) setPeriod(start, end);
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
        <Collapse collapseLevel='period' title={"period"}>
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
        {start !== null && end !== null ? (
          <div className='reset'>
            <ActionButton actionWithPayload={handleResetPeriod} alert>
              {"reset period"}
            </ActionButton>
            {start > end ? <div>incorrect period</div> : null}
          </div>
        ) : null}
      </FlexColumnCenter>
    </div>
  );
}
