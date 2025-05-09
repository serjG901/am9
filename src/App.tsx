import { useEffect } from "react";
import "./App.css";
import useDometerStore from "./store/userActionStore";
import { useShallow } from "zustand/react/shallow";
import Logo from "./assets/logo512.png";
import PWABadge from "./PWABadge";
import InputWithOptions from "./ui/input-with-options/InputWithOptions";
import Checked from "./ui/checked/Checked";
import useTimerStore from "./store/timerStore";

function App() {
  const [currentTimestamp, updateTimestamp, removeTimer] = useTimerStore(
    useShallow((state) => [
      state.currentTimestamp,
      state.updateTimestamp,
      state.removeTimer,
    ])
  );

  const [
    currentActionType,
    setCurrentActionType,
    isUserActive,
    actionTypes,
    isFiltredByCurrentActionType,
    toggleFilterByCurrentActionType,
    toggleAction,
    getCurrentActionStartTime,
    getActions,
    getActionsByType,
    deleteActions,
  ] = useDometerStore(
    useShallow((state) => [
      state.currentActionType,
      state.setCurrentActionType,
      state.isUserActive,
      state.actionTypes,
      state.isFiltredByCurrentActionType,
      state.toggleFilterByCurrentActionType,
      state.toggleAction,
      state.getCurrentActionStartTime,
      state.getActions,
      state.getActionsByType,
      state.deleteActions,
    ])
  );

  const reverseDoTimes = [...getActions()].reverse().filter((a) => a.endTime);

  useEffect(() => {
    updateTimestamp();
    return () => {
      removeTimer();
    };
  }, [removeTimer, updateTimestamp]);

  return (
    <>
      <div>
        <img src={Logo} width={64} height={64} />
      </div>

      <h1>dometer</h1>

      <InputWithOptions
        id='currentActionType-to-do'
        name='what to do'
        valueFromParent={currentActionType}
        disabled={isUserActive}
        hoistValue={setCurrentActionType}
        options={actionTypes}
      />

      <Checked
        id='is-filtred'
        name='apply filter'
        valueFromParent={isFiltredByCurrentActionType}
        hoistValue={toggleFilterByCurrentActionType}
      />

      <div className='switch'>
        <button
          className='switch-doing'
          data-is-doing={isUserActive ? "is-doing" : ""}
          onClick={toggleAction}
        >
          {isUserActive ? (
            "Stop"
          ) : (
            <>
              Start <span>{currentActionType}</span>
            </>
          )}
        </button>
      </div>

      {isUserActive ? (
        <div className='doing-blinker'>
          <span>
            {currentActionType ? currentActionType : "doing something"}
          </span>
        </div>
      ) : (
        <div className='resting'>just resting</div>
      )}

      <div className='start-time'>
        {getCurrentActionStartTime()
          ? `started at ${new Date(getCurrentActionStartTime()!)
              .toLocaleString()
              .split(",")
              .reverse()
              .join(" ")}, spend ~ ${Math.round(
              (currentTimestamp - getCurrentActionStartTime()!) / 1000
            )}s`
          : "..."}
      </div>

      {Object.keys(getActionsByType()).length ? (
        <div className='sum-times'>
          <div className='table'>
            <div className='row'>
              <div>action type</div>
              <div>current sum</div>
            </div>
            {Object.keys(getActionsByType()).map((key) => {
              const currentDay = new Date(Date.now())
                .toISOString()
                .slice(0, 10);
              const currentMounth = currentDay.slice(0, 7);
              const sum = getActionsByType()[key]!.reduce(
                (acc, a) => {
                  const aStartDay = new Date(a.startTime)
                    .toISOString()
                    .slice(0, 10);
                  const aStartMounth = aStartDay.slice(0, 7);

                  if (aStartDay === currentDay) {
                    acc[0] += Math.ceil((a.endTime! - a.startTime) / 1000);
                  }
                  if (aStartMounth === currentMounth) {
                    acc[1] += Math.ceil((a.endTime! - a.startTime) / 1000);
                  }
                  return acc;
                },
                [0, 0]
              );
              return (
                <div className='row'>
                  <div>
                    <button
                      disabled={isUserActive}
                      onClick={() => setCurrentActionType(key)}
                    >
                      {key}
                    </button>
                  </div>
                  <div className='text-left'>
                    <div>
                      <div className='gray'>{currentDay}:</div>
                      <div>
                        {sum[0]}s ~{Math.round(sum[0] / 60)}m ~
                        {Math.round(sum[0] / (60 * 60))}h
                      </div>
                    </div>
                    <div>
                      <div className='gray'>{currentMounth}:</div>
                      <div>
                        {sum[1]}s ~{Math.round(sum[1] / 60)}m ~
                        {Math.round(sum[1] / (60 * 60))}h
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {reverseDoTimes.length ? (
        <div className='do-times'>
          <div className='table'>
            <div className='row'>
              <div>action type</div>
              <div>start</div>
              <div>time</div>
              <div>stop</div>
            </div>
            {reverseDoTimes.map((time, i) => {
              const sec = Math.ceil((time.endTime! - time.startTime) / 1000);
              const dateTime1 = new Date(time.startTime)
                .toLocaleString()
                .split(",");
              const dateTime2 = new Date(time.endTime!)
                .toLocaleString()
                .split(",");
              return (
                <div className='row' key={i}>
                  <div>
                    <div>{time.actionType}</div>
                  </div>
                  <div>
                    <div>{dateTime1[0]}</div>
                    <div>{dateTime1[1]}</div>
                  </div>
                  <div>
                    <div>{sec} sec</div>
                    <div>~{Math.round(sec / 60)} min</div>
                  </div>
                  <div>
                    <div>{dateTime2[0]}</div>
                    <div>{dateTime2[1]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {reverseDoTimes.length ? (
        <div>
          <button
            className='delete-times'
            disabled={isUserActive}
            onClick={deleteActions}
          >
            DELETE{" "}
            {currentActionType ? <span>{currentActionType}</span> : "ALL"}
          </button>
        </div>
      ) : null}

      <PWABadge />
    </>
  );
}

export default App;
