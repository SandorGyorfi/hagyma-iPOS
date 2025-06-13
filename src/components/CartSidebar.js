import React from 'react';

const CartSidebar = ({ items, onQuantityChange, onRemove, onClear, onPayment, isLoading }) => {
  const total = items.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Fejléc */}
      <div className="
        p-4
        border-b-2
        border-csarda-barna-vilagos
        bg-white
      ">
        <h2 className="
          text-2xl
          font-bree
          text-csarda-barna-sotet
          flex
          justify-between
          items-center
        ">
          Kosár
          <button
            onClick={onClear}
            disabled={items.length === 0}
            className="
              text-base
              px-4
              py-2
              rounded-lg
              bg-csarda-piros-mely
              text-white
              hover:bg-csarda-piros-vilagos
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition-colors
              duration-200
            "
          >
            Ürítés
          </button>
        </h2>
      </div>

      {/* Tételek listája */}
      <div className="
        flex-1
        overflow-y-auto
        px-4
      ">
        {items.length === 0 ? (
          <div className="
            flex
            flex-col
            items-center
            justify-center
            h-full
            text-csarda-barna-vilagos
            text-lg
            font-bree
          ">
            A kosár üres
          </div>
        ) : (
          <ul className="py-4 space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="
                  bg-white
                  rounded-xl
                  p-4
                  shadow-sm
                  border-2
                  border-csarda-barna-vilagos
                "
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="
                    text-xl
                    font-bree
                    text-csarda-barna-sotet
                    flex-1
                  ">
                    {item.nev}
                  </h3>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="
                      ml-2
                      text-2xl
                      text-csarda-piros-mely
                      hover:text-csarda-piros-vilagos
                      transition-colors
                      duration-200
                      p-2
                    "
                  >
                    ×
                  </button>
                </div>

                <div className="
                  flex
                  justify-between
                  items-center
                ">
                  <div className="
                    flex
                    items-center
                    bg-csarda-feher-tort
                    rounded-lg
                    p-1
                  ">
                    <button
                      onClick={() => onQuantityChange(item.id, item.mennyiseg - 1)}
                      className="
                        text-2xl
                        w-12
                        h-12
                        flex
                        items-center
                        justify-center
                        text-csarda-barna-sotet
                        hover:bg-csarda-barna-vilagos
                        hover:bg-opacity-10
                        rounded-lg
                        transition-colors
                        duration-200
                      "
                    >
                      -
                    </button>
                    <span className="
                      text-xl
                      font-bree
                      w-12
                      text-center
                    ">
                      {item.mennyiseg}
                    </span>
                    <button
                      onClick={() => onQuantityChange(item.id, item.mennyiseg + 1)}
                      className="
                        text-2xl
                        w-12
                        h-12
                        flex
                        items-center
                        justify-center
                        text-csarda-barna-sotet
                        hover:bg-csarda-barna-vilagos
                        hover:bg-opacity-10
                        rounded-lg
                        transition-colors
                        duration-200
                      "
                    >
                      +
                    </button>
                  </div>
                  <p className="
                    text-xl
                    font-bold
                    text-csarda-piros-mely
                  ">
                    £{(item.ar * item.mennyiseg).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Összesítő és fizető gomb */}
      <div className="
        border-t-2
        border-csarda-barna-vilagos
        bg-white
        p-4
        space-y-4
      ">
        <div className="
          flex
          justify-between
          items-center
          text-2xl
          font-bree
          text-csarda-barna-sotet
        ">
          <span>Összesen:</span>
          <span className="text-csarda-piros-mely font-bold">
            £{total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onPayment}
          disabled={items.length === 0 || isLoading}
          className="
            w-full
            py-4
            text-xl
            font-bree
            rounded-xl
            bg-csarda-zold-palack
            text-white
            hover:bg-csarda-zold-kakukkfu
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-colors
            duration-200
            relative
          "
        >
          {isLoading ? (
            <span className="
              flex
              items-center
              justify-center
              gap-2
            ">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Feldolgozás...
            </span>
          ) : (
            'Fizetés'
          )}
        </button>
      </div>
    </div>
  );
};

export default CartSidebar; 