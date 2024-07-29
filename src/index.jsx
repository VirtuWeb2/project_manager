import ReactDOM from "react-dom/client";
import Main from "./routes/Main.jsx";
import "./index.css";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <UserProvider>
      <Main />
    </UserProvider>
  </GlobalContextProvider>
);
