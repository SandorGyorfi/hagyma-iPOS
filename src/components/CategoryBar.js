import React from 'react';

const CategoryBar = ({ selectedCategory, onSelect }) => {
  const categories = [
    { id: 'langos', name: 'Lángos' },
    { id: 'leves', name: 'Levesek' },
    { id: 'foetelek', name: 'Főételek' },
    { id: 'koret', name: 'Köretek' },
    { id: 'desszert', name: 'Desszertek' },
    { id: 'ital', name: 'Italok' }
  ];

  return (
    <div className="
      h-full
      flex
      items-center
      px-4
      space-x-4
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
            px-6
            py-2
            rounded-lg
            font-bree
            text-lg
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