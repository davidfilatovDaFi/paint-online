import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolBar";
import "./styles/index.scss"

function App() {
  return (
    <div className="app">
      <ToolBar/>
      <Canvas/>
    </div>
  );
}

export default App;
