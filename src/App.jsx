import "./App.css";
import Header from "./components/Header";
import WeatherContainer from "./components/WeatherContainer";

const App = () => {
  return (
    <div>
      <Header title="Brussels Weather" />
      <WeatherContainer />
    </div>
  );
};

export default App;
