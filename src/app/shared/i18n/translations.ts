export const translations = [
  {
    lang: 'en',
    translations: {
      "Mover": "Mover",
      "Leads": "Leads",
      "Customers": "Customers",
      "Employees": "Employees"
    }
  }, {
    lang: 'ru',
    translations: {
      "Mover": "Мувер",
      "Leads": "Перевозки",
      "Customers": "Заказчики",
      "Employees": "Рабочие"
    }
  }
];

export const defaultLang = localStorage.getItem('lang')
  ? localStorage.getItem('lang')
  : 'us';
