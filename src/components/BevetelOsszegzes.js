import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const BevetelOsszegzes = () => {
  const [napiBevetel, setNapiBevetel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBevetel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const q = query(
          collection(db, 'orders'),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const rendelesek = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            items: data.items || [],
            timestamp: data.timestamp?.toDate() || new Date(data.timestamp)
          };
        });

        // Rendelések csoportosítása dátum szerint
        const napiOsszegek = rendelesek.reduce((acc, rendeles) => {
          const datum = rendeles.timestamp;
          const datumStr = datum.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

          if (!acc[datumStr]) {
            acc[datumStr] = {
              osszeg: 0,
              rendelesek: []
            };
          }
          acc[datumStr].osszeg += rendeles.total || 0;
          acc[datumStr].rendelesek.push({
            ...rendeles,
            idopont: datum.toLocaleTimeString('hu-HU', {
              hour: '2-digit',
              minute: '2-digit'
            })
          });
          return acc;
        }, {});

        // Konvertálás tömbbé és rendezés dátum szerint csökkenő sorrendben
        const rendezettBevetel = Object.entries(napiOsszegek)
          .map(([datum, { osszeg, rendelesek }]) => ({
            datum,
            osszeg,
            rendelesek
          }))
          .sort((a, b) => {
            const [aEv, aHo, aNap] = a.datum.split('.');
            const [bEv, bHo, bNap] = b.datum.split('.');
            return new Date(bEv, bHo - 1, bNap) - new Date(aEv, aHo - 1, aNap);
          });

        setNapiBevetel(rendezettBevetel);
      } catch (err) {
        console.error('Hiba a bevétel lekérdezése során:', err);
        setError('Nem sikerült betölteni a bevételi adatokat. Kérjük, próbálja újra később.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBevetel();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-csarda-feher-tort">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-csarda-barna-sotet border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-csarda-barna-sotet text-lg font-bree">Adatok betöltése...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-csarda-feher-tort">
        <div className="bg-csarda-piros-mely/10 text-csarda-piros-mely p-4 rounded-lg max-w-md text-center">
          <p className="font-bree text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const teljesBevetel = napiBevetel.reduce((sum, nap) => sum + nap.osszeg, 0);

  return (
    <div className="min-h-screen bg-csarda-feher-tort p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bree text-csarda-barna-sotet">
            Bevétel kimutatás
          </h1>
          <p className="mt-2 text-xl font-bree text-csarda-barna-kozep">
            Teljes bevétel: {teljesBevetel.toLocaleString('hu-HU')} £
          </p>
        </div>

        {napiBevetel.length === 0 ? (
          <div className="text-center text-csarda-barna-kozep font-bree">
            Nincs megjeleníthető bevételi adat
          </div>
        ) : (
          <div className="space-y-6">
            {napiBevetel.map((nap) => (
              <div key={nap.datum} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-csarda-barna-sotet text-white p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bree">{nap.datum}</h2>
                    <p className="font-bree">
                      Napi bevétel: {nap.osszeg.toLocaleString('hu-HU')} £
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-csarda-barna-vilagos/20">
                        <th className="py-2 text-left font-bree text-csarda-barna-sotet">Időpont</th>
                        <th className="py-2 text-left font-bree text-csarda-barna-sotet">Tételek</th>
                        <th className="py-2 text-right font-bree text-csarda-barna-sotet">Fizetés módja</th>
                        <th className="py-2 text-right font-bree text-csarda-barna-sotet">Összeg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nap.rendelesek.map((rendeles, index) => (
                        <tr 
                          key={rendeles.id} 
                          className={index % 2 === 0 ? 'bg-csarda-feher-tort' : ''}
                        >
                          <td className="py-2 font-lora">{rendeles.idopont}</td>
                          <td className="py-2 font-lora">
                            {rendeles.items && rendeles.items.length > 0 ? (
                              rendeles.items.map((item, i) => (
                                <span key={i}>
                                  {item.quantity}x {item.name}
                                  {i < rendeles.items.length - 1 ? ', ' : ''}
                                </span>
                              ))
                            ) : (
                              'Nincs részletes tétel információ'
                            )}
                          </td>
                          <td className="py-2 text-right font-lora">
                            {rendeles.paymentMethod === 'cash' ? 'Készpénz' : 'Kártya'}
                          </td>
                          <td className="py-2 text-right font-bree">
                            {rendeles.total.toLocaleString('hu-HU')} £
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BevetelOsszegzes; 