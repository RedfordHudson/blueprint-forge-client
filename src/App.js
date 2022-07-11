// import './App.css';
// import ProgramsDisplay from './components/component.programsdisplay';

// import Blueprint from './components/component.blueprint';
// import Blueprint from './components/component.hierarchic.blueprint';
import BlueprintSelector from './components/blueprint.selector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Test from './components/test'
import BlueprintForge from './components/blueprint.forge';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BlueprintSelector />} />
            {/* <Route path='/blueprint/:name' element={<Test />} /> */}
            <Route path='/blueprint/:name' element={<BlueprintForge />} />
              
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
