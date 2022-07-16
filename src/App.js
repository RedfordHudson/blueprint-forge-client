import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BlueprintSelector from './components/blueprint.selector';
import BlueprintForge from './components/blueprint.forge';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BlueprintSelector />} />
            <Route path='/blueprint/:name' element={<BlueprintForge />} />
              
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
