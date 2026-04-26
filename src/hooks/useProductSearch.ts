import { useState, useEffect } from 'react';
import { Product, searchProducts } from '@/src/lib/openFoodFacts';

export function useProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const products = await searchProducts(query);
        setResults(products);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, isLoading, error };
}
