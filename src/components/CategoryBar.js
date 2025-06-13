import React from 'react';

const CategoryBar = ({ selectedCategory, onSelect }) => {
  const categories = [
    { id: 'langos', name: 'Lángos' },
    { id: 'szendvics', name: 'Szendvicsek' },
    { id: 'foetel', name: 'Főételek' },
    { id: 'palacsinta', name: 'Palacsinta' },
    { id: 'jegkrem', name: 'Jégkrémek' },
    { id: 'chips', name: 'Chipsek' },
    { id: 'ital', name: 'Italok' }
  ];

  return (
    <div className="
      h-full
      flex
      items-center
      px-2
      space-x-2
      overflow-x-auto
      scrollbar-thin
      scrollbar-thumb-csarda-barna-vilagos
      scrollbar-track-transparent
    ">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`
            px-3
            py-1.5
            rounded-lg
            font-bree
            text-2xl
            transition-colors
            duration-200
            border-2
            whitespace-nowrap
            ${
              selectedCategory === category.id
              ? 'bg-csarda-barna-sotet text-csarda-feher-alap border-csarda-piros-mely'
              : 'bg-transparent text-csarda-barna-sotet border-csarda-barna-vilagos hover:bg-csarda-barna-vilagos/10'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar; 