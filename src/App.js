import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Nexus from './components/nexus';
import ClassGallery from './components/class.gallery';
import EntityGallery from './components/entity.gallery';
import BlueprintSelector from './components/blueprint.selector';
import BlueprintForge from './components/blueprint.forge';
import SpacesSelector from './components/spaces.selector';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ClassGallery />} />
            <Route path='/class' element={<EntityGallery />} />
            {/* <Route path='/' element={<Nexus />} /> */}
            <Route path='/blueprints' element={<BlueprintSelector />} />
            <Route path='/blueprint/:name' element={<BlueprintForge />} />
            <Route path='/spaces' element={<SpacesSelector />} />
              
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
