import './App.css';
import { Layout } from './components/Layout';
import { Account } from './components/Account';

function App() {
  return (
    <div className="app">
      <Layout children={<Account />} />
    </div>
  );
}

export default App;
