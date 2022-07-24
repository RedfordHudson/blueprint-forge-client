import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nexus from './components/nexus';
import Inventory from './components/inventory';
import QuestFeed from './components/quest.feed';
import QuestForge from './components/quest.forge';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Nexus />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/quests' element={<QuestFeed />} />
            <Route path='/questForge' element={<QuestForge />} />
              
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
