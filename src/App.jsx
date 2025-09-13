import CommissionCalculator from "./CommissionCalculator";
import Overlay from "./Overlay.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/bounscal"
            element={<CommissionCalculator isAccountant={false} />}
          />
          <Route
            path="/bounscal/jo"
            element={<CommissionCalculator isAccountant={true} />}
          />
        </Routes>
      </Router>
      <Overlay />
    </ThemeProvider>
  );
}

export default App;
