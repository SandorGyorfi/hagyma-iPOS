import React, { useEffect } from 'react';
import { useFirebase } from '../hooks/useFirebase';

const OrderHistory = () => {
  const { todayOrders, loadTodayOrders, loading, error } = useFirebase();

  useEffect(() => {
    loadTodayOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-magyar-barna/10 rounded-magyar"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-magyar">
        Hiba történt a rendelések betöltése során
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-magyar-xl font-bold text-magyar-barna mb-6">
        Mai rendelések ({todayOrders.length})
      </h2>

      <div className="bg-csarda-feher-alap rounded-xl shadow-lg p-6">
        <h2 className="font-bree text-2xl text-csarda-barna-sotet mb-6">Rendelési előzmények</h2>
        
        <div className="space-y-6">
          {todayOrders.map((order) => (
            <div key={order.id} className="border-2 border-csarda-barna-vilagos rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-lora text-csarda-barna-kozep">
                  {new Date(order.createdAt.seconds * 1000).toLocaleDateString('hu-HU')}
                </span>
                <span className="font-bree text-lg text-csarda-piros-mely">
                  £{order.total.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="font-lora text-csarda-barna-sotet">
                      {item.quantity}x {item.name}
                    </div>
                    <div className="font-bree text-csarda-barna-kozep">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {todayOrders.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Még nincsenek mai rendelések
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 