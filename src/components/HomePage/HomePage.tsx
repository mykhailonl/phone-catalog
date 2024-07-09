import { Categories } from '../Categories';
import { ProductSlider } from '../ProductSlider';
import { Slider } from '../Slider';
import { Title } from '../Title';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    // "grid grid-cols-mobile gap-16px md:prose-md md:grid-cols-tablet md:px-content-md lg:mx-auto lg:grid-cols-desktop lg:px-content-lg"
    <main className={styles.homepage}>
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
    </main>
  );
};
