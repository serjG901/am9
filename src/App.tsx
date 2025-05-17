import { ReactNode, useEffect, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import React from "react";
import SettingsApp from "./pages/settings-app/SettingsApp";
import { useSettingsStore } from "./store/settingsStore";
import { name as appName } from "../package.json";
import PWABadge from "./PWABadge";
import ActionsPage from "./pages/actions-page/ActionsPage";
import { useShallow } from "zustand/shallow";

const lastHref = window.location.href.split("/").at(-1);
if (lastHref !== "" && lastHref !== "assetlinks.json")
  window.location.replace(`/${appName}/`);

function App() {
  const pageHref = (window.location.href.split("/").at(-1) as string) || "actions";

  const [page, setPage] = useState<string>(pageHref);
  const [hue] = useSettingsStore(useShallow((state) => [state.hue]));

  const pages: { [key: string]: ReactNode } = {
    actions: <ActionsPage />,
    settings: <SettingsApp />,
  };

  const handleActionMenu = (payload: string) => {
    setPage(payload);
    window.history.pushState({ page: payload }, "", `/${appName}/${payload}`);
  };

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "popstate",
      (event) => {
        setPage(event.state && event.state.page ? event.state?.page : "actions");
      },
      {
        signal: controller.signal,
      }
    );
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='app' style={{ "--hue": hue } as React.CSSProperties}>
      <Menu
        choisedOption={page}
        collapseLevel='menu'
        title={<span>&#9776;</span>}
        options={Object.keys(pages)}
        actionWithPayload={handleActionMenu}
      />
      {pages[page] || null}
      <PWABadge />
    </div>
  );
}
export default App;
