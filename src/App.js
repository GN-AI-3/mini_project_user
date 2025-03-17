import "./App.css";
import DrawingApp from "./pages/DrawingApp";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { ToggleProvider, useToggle } from "./ToggleContext";
import blackboardEraser from "./images/blackboardEraser.png"; // 이미지 import
import BlackboardGraffiti from "./images/Blackboard-graffiti.png"; // 이미지 import

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
      <p className="noisy-person-text">떠든 사람 : ㅁㅁㅁ</p>
      <p className="pranksters-person-text">장난친 사람 : ㅁㅁㅁ</p>
      <img className="BlackboardGraffiti-img" src={BlackboardGraffiti} alt="BlackboardGraffiti" />
      <img className="blackboardEraser-img" src={blackboardEraser} alt="blackboardEraser" />

      <div className="drawing-background">
        <DrawingApp />
      </div>
      {!isToggled ? <Home /> : <Result />}
    </div>
  );
}

export default App;
