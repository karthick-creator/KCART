
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
