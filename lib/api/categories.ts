
import { fetcher, COINGECKO_REVALIDATE } from "@/lib/coingecko.actions";

export async function getCategories() {
  return fetcher<Category[]>(
    '/coins/categories',
    undefined,
    COINGECKO_REVALIDATE.CATEGORIES
  );
};
