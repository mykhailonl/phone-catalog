import { Categories } from '../Categories';
import { ProductSlider } from '../ProductSlider';
import { Slider } from '../Slider';
import { Title } from '../Title';

export const HomePage = () => {
  return (
    <main>
      <Title />

      <Slider />

      <ProductSlider
        title="Brand new models"
        apiUrl="/api/products.json"
        discount={false}
        newOnly={true}
      />

      <Categories />

      <div className="mb-16">
        <ProductSlider
          title="Hot prices"
          apiUrl="/api/products.json"
          discount={true}
          newOnly={false}
        />
      </div>
    </main>
  );
};
