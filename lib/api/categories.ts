
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

export async function getCategories() {
  return fetcher<Category[]>(
    '/coins/categories',
    undefined,
    COINGECKO_REVALIDATE.CATEGORIES
  );
};
