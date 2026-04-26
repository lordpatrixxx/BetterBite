import { calculateHealthScore } from './healthScore';

export interface Product {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  quantity: string;
  ingredients_text: string;
  additives_n: number;
  nutrition: any;
  score: number;
  ingredients?: string[];
}

export async function getProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`, {
      referrerPolicy: 'no-referrer'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.status === 0 || !data.product) return null;
    return formatProduct(data.product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&page_size=24&fields=code,product_name,product_name_en,brands,categories_tags,image_front_url,image_url,image_small_url,quantity,ingredients_text,additives_n,nutriments,ingredients_tags`;
    const res = await fetch(url, {
      referrerPolicy: 'no-referrer'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return (data.products || []).map(formatProduct);
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

export async function getAlternatives(category: string, currentScore: number): Promise<Product[]> {
  if (!category || category === "Unknown Category") return [];
  
  try {
    // Try category search first as it's more accurate
    const categoryTag = category.toLowerCase().trim().replace(/\s+/g, '-');
    let url = `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${encodeURIComponent(categoryTag)}&sort_by=nutriscore_score&page_size=24&fields=code,product_name,product_name_en,brands,categories_tags,image_front_url,image_url,image_small_url,quantity,ingredients_text,additives_n,nutriments,ingredients_tags`;
    
    let res = await fetch(url, {
      referrerPolicy: 'no-referrer'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let data = await res.json();
    
    // Fallback to name search if no products found with category tag
    if (!data.products || data.products.length === 0) {
      url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(category)}&sort_by=nutriscore_score&page_size=24&fields=code,product_name,product_name_en,brands,categories_tags,image_front_url,image_url,image_small_url,quantity,ingredients_text,additives_n,nutriments,ingredients_tags`;
      res = await fetch(url, {
        referrerPolicy: 'no-referrer'
      });
      data = await res.json();
    }
    
    if (!data.products || data.products.length === 0) return [];
    
    return data.products
      .map(formatProduct)
      .filter((p: Product) => p.score >= currentScore - 5)
      .sort((a: Product, b: Product) => b.score - a.score)
      .slice(0, 6);
  } catch (error) {
    console.error("Error getting alternatives:", error);
    return [];
  }
}

function formatProduct(product: any): Product {
  const nutrition = product.nutriments || {};
  const score = calculateHealthScore(nutrition);
  
  // Try different image sources in order of preference
  const imageUrl = product.image_front_url || 
                   product.image_url || 
                   product.image_small_url || 
                   "https://placehold.co/400x400?text=No+Image";
  
  // Extract category in a better way
  let category = "Unknown Category";
  if (product.categories_tags && product.categories_tags.length > 0) {
    // Try to find a human-readable category
    category = product.categories_tags[0].replace(/^en:/, '').replace(/-/g, ' ');
    // Capitalize each word
    category = category.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } else if (product.categories) {
    category = product.categories.split(',')[0].trim();
  }
  
  return {
    barcode: product.code || "",
    name: product.product_name || product.product_name_en || "Unknown Product",
    brand: product.brands || "Unknown Brand",
    category: category,
    image: imageUrl,
    quantity: product.quantity || "",
    ingredients_text: product.ingredients_text || "",
    additives_n: product.additives_n || 0,
    nutrition,
    score,
    ingredients: product.ingredients_tags?.map((i: string) => i.replace(/^en:/, '').replace(/-/g, ' ')) || []
  };
}
