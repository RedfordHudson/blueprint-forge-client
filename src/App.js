import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BlueprintSelector from './components/blueprint.selector';
import BlueprintForge from './components/blueprint.forge';
import SpacesSelector from './components/spaces.selector';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BlueprintSelector />} />
            <Route path='/blueprint/:name' element={<BlueprintForge />} />
            <Route path='/spaces' element={<SpacesSelector />} />
              
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
