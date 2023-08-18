import { Provider } from "react-redux";
import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolBar";
import './styles/index.scss'
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <ToolBar />
        <Canvas />
      </div>
    </Provider>
  );
}

export default App;
