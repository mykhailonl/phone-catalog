import { Slider } from './components/Slider/Slider';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { ProductSlider } from './components/ProductSlider';
import { Categories } from './components/Categories';

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

      <ProductSlider
        title="Brand new models"
        apiUrl="/api/products.json"
        discount={false}
        newOnly={true}
      />

      <Categories />

      <ProductSlider
        title="Hot prices"
        apiUrl="/api/products.json"
        discount={true}
        newOnly={false}
      />
    </div>
  );
};
