import './App.css';
import { DataContextProvider } from './components/managementState/dataContext/DataContext';
import MainRouter from './router/mainrouter/MainRouter';

function App() {


  return (
    <DataContextProvider>
      <MainRouter/>
    </DataContextProvider>
  );
}

export default App;
