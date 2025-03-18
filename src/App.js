import "./App.css";
import DrawingApp from "./pages/DrawingApp";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { AppProvider, useAppContext } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isToggled } = useAppContext();

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
