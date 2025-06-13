import React from 'react';

const ProductGrid = ({ products, onAdd }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((termek) => (
        <div
          key={termek.id}
          className="relative bg-csarda-feher-alap rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300
                    border-2 border-csarda-barna-sotet hover:border-csarda-piros-mely"
          onClick={() => onAdd(termek)}
        >
          <h3 className="font-bree text-lg font-semibold text-csarda-barna-sotet mb-2 line-clamp-2">
            {termek.nev}
          </h3>
          <p className="font-lora text-csarda-barna-kozep mb-4">{termek.leiras}</p>
          <p className="font-bree text-xl text-csarda-piros-mely">
            £{termek.ar.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 