import { Banner } from './components/Banner/Banner-slider';
import { Header } from './components/Header';
import { Title } from './components/Title';

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

      <Banner />
    </div>
  );
};
