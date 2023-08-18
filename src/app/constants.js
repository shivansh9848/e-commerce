export const ITEMS_PER_PAGE = 10;
export const discountedPrice = (product) => {
  return (
    <p className="text-sm  font-medium text-gray-900">
      $
      {Math.round(
        product.price - (product.discountPercentage * product.price) / 100
      )}
    </p>
  );
};
