import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <div className="bg-background ">
      <Router>
      <AppRoutes />
    </Router>
    </div>
  );
}

export default App;
