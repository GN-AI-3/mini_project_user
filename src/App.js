import "./App.css";
import DrawingApp from "./pages/DrawingApp";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { ToggleProvider, useToggle } from "./ToggleContext";

function App() {
  return (
    <ToggleProvider>
      <AppContent />
    </ToggleProvider>
  );
}

function AppContent() {
  const { isToggled } = useToggle();

  return (
    <div className="App">
      <div className="drawing-background">
        <DrawingApp />
      </div>
      {!isToggled ? <Home /> : <Result />}
    </div>
  );
}

export default App;
