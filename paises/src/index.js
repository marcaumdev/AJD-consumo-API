import React from 'react';
import {createRoot} from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import PaisInfos from './components/paisInfos/PaisInfos.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} /> {/* Home */}
          <Route path='*' element={<NotFound />} /> {/*Redireciona para Not Found caso não encontre nenhuma rota*/}
          <Route path="/:countryName" element={<PaisInfos />} /> {/*Detalhes Pais*/}
        </Routes>
    </Router>
  </React.StrictMode>
);