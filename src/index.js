import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Calendar from "./Calendar";
import Community from "./Community";
import Dashboard from "./Dashboard";
import HealthMonitor from "./HealthMonitor";
import LearningHub from "./LearningHub";
import Login from "./Login";
import Profile from "./Profile";
import Settings from "./Settings";
import Support from "./Support";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
