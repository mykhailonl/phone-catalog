import { Slider } from './components/Slider/Slider';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { NewModelsSlider } from './components/NewModelsSlider';

/*
TODO

1.Create redux context
2. move Header-title etc into homepage? 
3. move all used images and api from public folder
*/

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Title />

      <Slider />

      <NewModelsSlider />
    </div>
  );
};
