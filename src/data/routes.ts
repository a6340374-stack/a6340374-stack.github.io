export const dispatcher = { phone: '+79174324970', label: '+7 (917) 432-49-70' };

export type Route = {
  id: string; from: string; to: string; times: string[]; daily: boolean;
  price: number | null; priceConfirmed: boolean; note?: string; source: 'board' | 'sheet' | 'both';
};

// Transcribed from the two supplied photographs. No inferred arrival times,
// inventory, trip duration or intermediate-stop fares are generated.
export const routes: Route[] = [
  { id: 'sibay-magnitogorsk', from: 'Сибай', to: 'Магнитогорск', times: ['08:15','10:15','12:00','14:00','15:15','17:15','19:15'], daily: true, price: 400, priceConfirmed: true, source: 'both' },
  { id: 'magnitogorsk-sibay', from: 'Магнитогорск', to: 'Сибай', times: ['08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'], daily: true, price: null, priceConfirmed: false, source: 'both' },
  { id: 'kizilskoye-magnitogorsk', from: 'Кизильское', to: 'Магнитогорск', times: ['08:35','10:35','12:30','14:30','15:35','17:35','19:35'], daily: true, price: null, priceConfirmed: false, source: 'sheet' },
  { id: 'sibay-orenburg', from: 'Сибай', to: 'Оренбург', times: ['23:55'], daily: true, price: 1400, priceConfirmed: true, source: 'both' },
  { id: 'orenburg-sibay', from: 'Оренбург', to: 'Сибай', times: ['19:30'], daily: true, price: 1400, priceConfirmed: false, source: 'board' },
  { id: 'sibay-sol-iletsk', from: 'Сибай', to: 'Соль-Илецк', times: [], daily: true, price: null, priceConfirmed: false, note: 'Через Оренбург. Отправление до Оренбурга — в 23:55. Время и возможность поездки до Соль-Илецка уточните у диспетчера.', source: 'sheet' },
  { id: 'kizilskoye-orenburg', from: 'Кизильское', to: 'Оренбург', times: ['21:10'], daily: true, price: null, priceConfirmed: false, source: 'sheet' },
  { id: 'kizilskoye-sol-iletsk', from: 'Кизильское', to: 'Соль-Илецк', times: ['21:10'], daily: true, price: null, priceConfirmed: false, source: 'sheet' },
  { id: 'magnitogorsk-orenburg', from: 'Магнитогорск', to: 'Оренбург', times: ['22:00'], daily: true, price: null, priceConfirmed: false, source: 'sheet' },
  { id: 'magnitogorsk-sol-iletsk', from: 'Магнитогорск', to: 'Соль-Илецк', times: ['22:00'], daily: true, price: null, priceConfirmed: false, source: 'sheet' },
  { id: 'sibay-isyangulovo', from: 'Сибай', to: 'Исянгулово', times: [], daily: false, price: 800, priceConfirmed: false, note: 'На фото читаются направление и цена 800 ₽. Время и дни отправления не видны — уточните их у диспетчера.', source: 'board' },
];

export const cities = ['Сибай', 'Магнитогорск', 'Кизильское', 'Оренбург', 'Соль-Илецк', 'Исянгулово'];
