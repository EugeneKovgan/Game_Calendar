import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
