// Category icons mapping for products
export const categoryIcons: Record<string, string> = {
  'Meat': '🍖',
  'Dairy': '🥛', 
  'Grains': '🌾',
  'Fruits': '🍎',
  'Vegetables': '🥦',
  'Bakery': '🥐',
  'Oils': '🫒',
  'Beverages': '🥤',
  'Snacks': '🍿',
  'Frozen': '🧊',
  'Canned': '🥫',
  'Spices': '🌶️',
  'Sweets': '🍭',
  'Fish': '🐟',
  'Eggs': '🥚',
  'Nuts': '🥜',
  'Others': '🛒'
};

export const getCategoryIcon = (category: string): string => {
  return categoryIcons[category] || categoryIcons['Others'];
};