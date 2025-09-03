import CommissionCalculator from "./CommissionCalculator";
import Overlay from "./Overlay.jsx";

import { ThemeProvider } from "./ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <CommissionCalculator />
      <Overlay />
    </ThemeProvider>
  );
}

export default App;
