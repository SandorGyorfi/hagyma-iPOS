import React from 'react';

const ProductGrid = ({ products, onAddToCart }) => {
  // Csak az első 9 terméket jelenítjük meg
  const displayedProducts = products.slice(0, 9);

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-csarda-barna-kozep text-xl font-lora">
          Nincsenek termékek ebben a kategóriában
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 p-3 h-full auto-rows-fr">
      {displayedProducts.map((product) => (
        <button
          key={product.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-csarda-barna-vilagos hover:border-csarda-piros-mely flex flex-col overflow-hidden relative group p-3 min-h-0"
          onClick={() => onAddToCart(product)}
        >
          <div className="flex-1 flex flex-col justify-between w-full min-h-0">
            <div>
              <h3 className="text-3xl font-bree text-csarda-barna-sotet leading-tight mb-2">
                {product.nev}
              </h3>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-bold text-csarda-piros-mely">
                £{product.ar.toFixed(2)}
              </p>
              <span className="text-sm px-3 py-1 bg-csarda-barna-vilagos bg-opacity-10 rounded-full text-csarda-barna-sotet font-medium">
                {product.kategoria}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProductGrid; 