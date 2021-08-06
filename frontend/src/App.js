import React from "react";
import { Switch, Route } from "react-router-dom";
import PageLayout from "containers/Layout";
import PeoplePage from "pages/people";
import {
  INITIAL_STATE,
  GlobalStateContext,
  globalReducer,
} from "context/GlobalContext";
import { NotificationsProvider } from "context/NotificationsContext";
import "ui/assets/fonts/roboto.css";
import "ui/assets/fonts/custom-icons.css";
import "ui/assets/fonts/fontawesome.all.min.css";
import "ui/assets/css/switch.css";

function App() {
  const [globalState, dispatchToGlobal] = React.useReducer(
    globalReducer,
    INITIAL_STATE
  );

  return (
    <GlobalStateContext.Provider
      value={{ state: globalState, dispatch: dispatchToGlobal }}
    >
      <NotificationsProvider>
        <PageLayout>
          <Switch>
            <Route path="/">
              <PeoplePage />
            </Route>
            <Route path="/people">
              <PeoplePage />
            </Route>
          </Switch>
        </PageLayout>
      </NotificationsProvider>
    </GlobalStateContext.Provider>
  );
}

export default App;
