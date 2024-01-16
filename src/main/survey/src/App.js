import './App.css';
import axios from "axios";

function App() {
  const selectData = () => {
    axios.post('/testData', ['a', 'b'])
        .then((res) => console.log(res));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => selectData()}>조회입니다</button>
      </header>
    </div>
  );
}

export default App;
