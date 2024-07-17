import { Categories } from '../Categories';
import { ProductSlider } from '../ProductSlider';
import { Slider } from '../Slider';
import { Title } from '../Title';

import styles from './HomePage.module.scss';

const { homepage, homepage__content } = styles;

export const HomePage = () => {
  return (
    <main className={homepage}>
      <div className={homepage__content}>
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
    </main>
  );
};
