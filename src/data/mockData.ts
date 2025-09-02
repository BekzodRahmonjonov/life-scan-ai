// ScanDora Mock Data
export interface Market {
  id: string;
  name: string;
  city: string;
  logo?: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
  nutrition?: {
    sugar_g?: number;
    fat_g?: number;
    protein_g?: number;
    kcal?: number;
  };
}

export interface Receipt {
  id: string;
  market: Market;
  date: string;
  totalUZS: number;
  items: ReceiptItem[];
  ai: {
    health: string[];
    saving: string[];
  };
}

export interface Recipe {
  id: string;
  title: string;
  kcal: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  ingredients: string[];
  missingIngredients: string[];
  instructions: string[];
  matchedItems: string[];
}

export const mockMarkets: Market[] = [
  { id: 'korzinka', name: 'Korzinka Magic', city: 'Tashkent' },
  { id: 'macro', name: 'Macro Market', city: 'Tashkent' },
  { id: 'havas', name: 'Havas Market', city: 'Samarkand' },
  { id: 'uzum', name: 'Uzum Market', city: 'Tashkent' },
];

export const mockReceipts: Receipt[] = [
  {
    id: 'R-240901-0001',
    market: mockMarkets[0],
    date: '2024-09-01T12:30:00',
    totalUZS: 187000,
    items: [
      {
        id: 'item-1',
        name: 'Yogurt, 500g',
        quantity: 2,
        unitPrice: 17000,
        total: 34000,
        category: 'Dairy',
        nutrition: { sugar_g: 20, kcal: 150 }
      },
      {
        id: 'item-2',
        name: 'Chicken Breast, 1kg',
        quantity: 1,
        unitPrice: 52000,
        total: 52000,
        category: 'Meat',
        nutrition: { protein_g: 31, fat_g: 3.6, kcal: 165 }
      },
      {
        id: 'item-3',
        name: 'Brown Rice, 1kg',
        quantity: 1,
        unitPrice: 28000,
        total: 28000,
        category: 'Grains',
        nutrition: { protein_g: 8, kcal: 112 }
      },
      {
        id: 'item-4',
        name: 'Apples, 1kg',
        quantity: 1,
        unitPrice: 22000,
        total: 22000,
        category: 'Fruits',
        nutrition: { sugar_g: 10, kcal: 52 }
      },
      {
        id: 'item-5',
        name: 'Olive Oil, 500ml',
        quantity: 1,
        unitPrice: 45000,
        total: 45000,
        category: 'Oils',
        nutrition: { fat_g: 100, kcal: 884 }
      }
    ],
    ai: {
      health: [
        "Shakar miqdorini 30% kamaytirish uchun oddiy yogurtga o'ting",
        "Ko'proq pishloq va yong'oq qo'shing - protein manbai",
        "Qo'shilgan shakar o'rniga tabiiy mevalar iste'mol qiling"
      ],
      saving: [
        "Karton tuxum 10% arzonroq: brand X → brand Y",
        "Uzum Market'da chicken breast 8% arzonroq",
        "Ommaviy xarid qilsangiz 15% chegirma olasiz"
      ]
    }
  },
  {
    id: 'R-240828-0002',
    market: mockMarkets[1],
    date: '2024-08-28T15:45:00',
    totalUZS: 95000,
    items: [
      {
        id: 'item-6',
        name: 'Bread, 400g',
        quantity: 2,
        unitPrice: 8000,
        total: 16000,
        category: 'Bakery',
        nutrition: { kcal: 265 }
      },
      {
        id: 'item-7',
        name: 'Milk, 1L',
        quantity: 1,
        unitPrice: 12000,
        total: 12000,
        category: 'Dairy',
        nutrition: { protein_g: 3.4, kcal: 42 }
      },
      {
        id: 'item-8',
        name: 'Bananas, 1kg',
        quantity: 1,
        unitPrice: 18000,
        total: 18000,
        category: 'Fruits',
        nutrition: { sugar_g: 12, kcal: 89 }
      },
      {
        id: 'item-9',
        name: 'Tomatoes, 1kg',
        quantity: 2,
        unitPrice: 15000,
        total: 30000,
        category: 'Vegetables',
        nutrition: { kcal: 18 }
      }
    ],
    ai: {
      health: [
        "Kam yog'li sut tanlang - 40% kam kaloriya",
        "Pomidor lykopin manbai - antioksidant"
      ],
      saving: [
        "Non uchun Korzinka'da 15% chegirma",
        "Mevalar ertalab arzonroq"
      ]
    }
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Healthy Chicken & Rice Bowl',
    kcal: 420,
    prepTime: '25 min',
    difficulty: 'Easy',
    image: '/placeholder-recipe.jpg',
    ingredients: ['Chicken Breast', 'Brown Rice', 'Olive Oil', 'Mixed Vegetables'],
    missingIngredients: ['Bell Peppers', 'Soy Sauce'],
    instructions: [
      'Cook brown rice according to package instructions',
      'Season and grill chicken breast',
      'Steam vegetables',
      'Combine in bowl and serve'
    ],
    matchedItems: ['Chicken Breast, 1kg', 'Brown Rice, 1kg', 'Olive Oil, 500ml']
  },
  {
    id: 'recipe-2',
    title: 'Apple Yogurt Parfait',
    kcal: 180,
    prepTime: '5 min',
    difficulty: 'Easy',
    image: '/placeholder-recipe.jpg',
    ingredients: ['Yogurt', 'Apples', 'Honey', 'Nuts'],
    missingIngredients: ['Granola', 'Cinnamon'],
    instructions: [
      'Dice apples into small pieces',
      'Layer yogurt and apples in glass',
      'Drizzle with honey',
      'Top with nuts'
    ],
    matchedItems: ['Yogurt, 500g', 'Apples, 1kg']
  }
];

export const categoryData = [
  { name: 'Dairy', spent: 46000, percentage: 25, color: '#10b981' },
  { name: 'Meat', spent: 52000, percentage: 28, color: '#f59e0b' },
  { name: 'Grains', spent: 44000, percentage: 24, color: '#6366f1' },
  { name: 'Fruits', spent: 40000, percentage: 21, color: '#ec4899' },
  { name: 'Others', spent: 5000, percentage: 2, color: '#64748b' }
];

export const weeklyData = [
  { day: 'Mon', spent: 45000 },
  { day: 'Tue', spent: 32000 },
  { day: 'Wed', spent: 67000 },
  { day: 'Thu', spent: 28000 },
  { day: 'Fri', spent: 89000 },
  { day: 'Sat', spent: 134000 },
  { day: 'Sun', spent: 78000 }
];

export const healthTips = [
  {
    id: 'tip-1',
    title: 'Shakar kamaytirishga harakat qiling',
    description: 'Kunlik shakar iste\'molingizni 25g gacha cheklang - bu 6 choy qoshiq',
    relatedItems: ['Yogurt, 500g'],
    type: 'sugar'
  },
  {
    id: 'tip-2', 
    title: 'Ko\'proq protein qo\'shing',
    description: 'Har bir ovqatda protein mavjud bo\'lsin - meva bilan yong\'oq yeyish yaxshi',
    relatedItems: ['Chicken Breast, 1kg'],
    type: 'protein'
  },
  {
    id: 'tip-3',
    title: 'Rangli mevalar iste\'mol qiling',
    description: 'Har xil rangli meva va sabzavotlar turli vitaminlar beradi',
    relatedItems: ['Apples, 1kg', 'Tomatoes, 1kg'],
    type: 'vitamins'
  }
];

export const savingTips = [
  {
    id: 'save-1',
    title: 'Ommaviy xarid qiling',
    description: 'Katta o\'lchamdagi mahsulotlar gramm uchun arzonroq',
    potentialSaving: 15000,
    relatedItems: ['Brown Rice, 1kg']
  },
  {
    id: 'save-2',
    title: 'Mavsumiy mevalar tanlang',
    description: 'Mavsumida bo\'lgan mevalar 40% gacha arzonroq',
    potentialSaving: 8000,
    relatedItems: ['Apples, 1kg']
  },
  {
    id: 'save-3',
    title: 'Mahalliy brendlarni sinab ko\'ring',
    description: 'Mahalliy ishlab chiqarilgan mahsulotlar ko\'pincha sifatli va arzon',
    potentialSaving: 12000,
    relatedItems: ['Milk, 1L']
  }
];

// Language strings (i18n ready)
export const strings = {
  uz: {
    common: {
      scan: "Chekni skan qil",
      back: "Orqaga",
      save: "Saqlash",
      cancel: "Bekor qilish",
      loading: "Yuklanmoqda...",
      error: "Xatolik yuz berdi"
    },
    welcome: {
      title: "ScanDora ga xush kelibsiz",
      subtitle: "Oziq-ovqat xarajatlaringizni kuzating va AI tavsiyalarini oling",
      scanButton: "Yangi chekni skan qiling",
      viewDemo: "Demo ma'lumotlarni ko'ring"
    },
    insights: {
      totalSpent: "Jami xarajat",
      totalItems: "Jami mahsulotlar",
      totalSaved: "Jami tejaldi",
      weeklySummary: "Haftalik xulosa",
      categoryBreakdown: "Kategoriyalar bo'yicha",
      healthTips: "Sog'liq maslahatlari",
      savingTips: "Tejash maslahatlari"
    },
    empty: {
      noData: "Ma'lumot yo'q. Avval chek skan qiling.",
      noReceipts: "Hali cheklar yo'q",
      scanFirst: "Birinchi chekingizni skan qiling"
    }
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('UZS', '').trim() + ' so\'m';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'  
  });
};