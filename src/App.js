import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import MainBox from './components/MainBox/Mainbox';

function App() {
  return (
    <div className='App' style={{ display: 'flex' }}>
      <Sidebar />
      <MainBox />
    </div>
  );
}

export default App;
