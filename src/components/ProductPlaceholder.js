import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductPlaceholder = () => (
  <ContentLoader
    speed={2}
    width={150}
    height={200}
    viewBox="0 0 150 200"
    backgroundColor="#ddd"
    foregroundColor="#ecebeb">
    <Rect x="10" y="10" rx="8" ry="8" width="130" height="120" />
    <Rect x="10" y="140" rx="4" ry="4" width="100" height="15" />
    <Rect x="10" y="160" rx="4" ry="4" width="80" height="15" />
  </ContentLoader>
);

export default ProductPlaceholder;
