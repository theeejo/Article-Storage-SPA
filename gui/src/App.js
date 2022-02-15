import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticleTable from './components/Articles';
import FormArticle from './components/FormArticle';
import References from './components/References';
import FormReference from './components/FormReference';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleTable />} />
          <Route path="/formArticle" element={<FormArticle />} />
          <Route path="/references" element={<References />} />
          <Route path="/formReference" element={<FormReference />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
