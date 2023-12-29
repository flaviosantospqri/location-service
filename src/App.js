import "./index.css";
import "./App.css";
import { Header } from "./components";
import RouterApp from "./router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
