import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  return (
    <div className="p-d-inline-flex">
      <Header></Header>
      <div style={{ width: "450px", margin: "auto" }}>
        <Home></Home>
      </div>
    </div>
  );
}

export default App;
