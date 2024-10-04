import React from "react";
import { Link } from "react-router-dom";

const popularProductsData = [
  {
    id: `1000`,
    product_name: `Tour Ho Chi Minh City`,
    product_thumbnail: `https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-14-inch-2021-1tb_2_.png`,
    product_price: `$100.00`,
    product_stock: 56,
  },
  {
    id: `1001`,
    product_name: `Tour Can Tho City`,
    product_thumbnail: `https://dlcdnwebimgs.asus.com/gain/096bd769-b48d-41ea-9eb5-7d305aa8a6fe/w800`,
    product_price: `$200.00`,
    product_stock: 0,
  },
  {
    id: `1003`,
    product_name: `Tour Hai Phong City`,
    product_thumbnail: `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000`,
    product_price: `$150.00`,
    product_stock: 20,
  },
];

const PopularTours = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Popular Tours</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProductsData.map((product) => (
          <Link to={`/tours/${product.id}`} className="flex hover:no-underline">
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.product_thumbnail}
                alt={product.product_name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.product_name}</p>
              <span
                className={`text-sm font-medium ${
                  product.product_stock === 0
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {product.product_stock === 0
                  ? `Out of slot`
                  : product.product_stock + ` slots`}
              </span>
            </div>
            <div className="text-xs text-gray-500 pl-2">
              {product.product_price}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTours;
