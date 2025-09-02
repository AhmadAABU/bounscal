import CommissionCalculator from "./CommissionCalculator";
import OverlayExample from "./Overlay";
import { ThemeProvider } from "./ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <CommissionCalculator />
      <OverlayExample />
    </ThemeProvider>
  );
}

export default App;
