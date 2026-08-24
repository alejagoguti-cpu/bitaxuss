import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Blog from "./pages/Blog";
import Home from "./pages/Home";

const appBasePath = import.meta.env.BASE_URL === "/"
  ? ""
  : import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Switch>
      <Route path={`${appBasePath}/blog`} component={Blog} />
      <Route path={`${appBasePath}/blog/`} component={Blog} />
      <Route path={appBasePath || "/"} component={Home} />
      {appBasePath && <Route path={`${appBasePath}/`} component={Home} />}
      <Route path={"/404"} component={NotFound} />
      {/* This is a single-page marketing site; render the landing under deployment-specific path prefixes. */}
      <Route component={Home} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
