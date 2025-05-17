import "./style.css";
import { useShallow } from "zustand/shallow";
import { ChangeEvent, useEffect, useState } from "react";
import { name as appName } from "../../../../package.json";
import ActionButton from "../../atom/action-button/ActionButton";
import useActionsStore from "../../../store/actionsStore";
import getDatetimeToString from "../../../helpers/getDatetimeToString";

export default function ManageData() {
  const [getState, setState] = useActionsStore(
    useShallow((state) => [state.getState, state.setState])
  );

  const [uploadStatus, setUploadStatus] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const getExistDB = () => ({
    [`${appName}-actions`]: getState(),
  });

  function saveAsLegacy() {
    const aDownloadFile: HTMLAnchorElement = document.getElementById(
      "aDownloadFile"
    ) as HTMLAnchorElement;
    const opts = { type: `application/${appName}` };
    const file = new File([JSON.stringify(getExistDB(), null, 4)], "", opts);

    aDownloadFile!.href = window.URL.createObjectURL(file);
    aDownloadFile!.setAttribute(
      "download",
      `${appName}-actions-${getDatetimeToString()}.json`
    );
    aDownloadFile!.click();
  }

  const handleDownloadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    handleClick();
    const file = e.target.files![0];
    const contents = await file.text();
    const db = JSON.parse(contents);
    Object.keys(db).forEach((key: string) => {
      if (key === `${appName}-actions`) setState(db[key]);
    });
    setUploadStatus(true);
  };

  useEffect(() => {
    setUploadStatus(false);
  }, [clickCount]);

  useEffect(() => {
    let timer = 0;
    if (uploadStatus) timer = setTimeout(() => setUploadStatus(false), 5000);
    return () => clearTimeout(timer);
  }, [uploadStatus]);

  return (
    <div className='load-db'>
      <div>
        <ActionButton actionWithPayload={saveAsLegacy}>
          download data
        </ActionButton>
        <a id='aDownloadFile' download></a>
      </div>

      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>Data uploaded</div>
        </div>
      ) : (
        <div className='input-file'>
          <label htmlFor='oldOpenFile'>
            <span>upload data</span>
            <input
              id='oldOpenFile'
              name='oldOpenFile'
              type='file'
              title='file'
              accept='.json'
              onChange={handleDownloadFile}
            />
          </label>
        </div>
      )}
    </div>
  );
}
