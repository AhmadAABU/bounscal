import CommissionCalculator from "./CommissionCalculator";
import Overlay from "./Overlay.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<CommissionCalculator isAccountant={false} />}
          />
          <Route
            path="/jo"
            element={<CommissionCalculator isAccountant={true} />}
          />
        </Routes>
      </Router>
      <Overlay />
    </ThemeProvider>
  );
}

export default App;
