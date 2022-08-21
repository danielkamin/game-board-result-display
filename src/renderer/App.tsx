import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [test, setTest] = useState('');
  window.electron.ipcRenderer.on('ipc-test', (arg) => {
    console.log(arg);
    setTest(arg as string);
  });
  return (
    <div className="text-orange-500">
      <div>Hello = {test}</div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
