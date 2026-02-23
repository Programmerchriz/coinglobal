import { getCategories } from '@/lib/api/categories';
import CategoriesTable from '@/components/categories/CategoriesTable';

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div id="categories" className="custom-scrollbar animate-fade-in-up">
      <h4 className="text-xl md:text-2xl font-semibold mb-4 text-white">
        Top Categories
      </h4>

      <CategoriesTable categories={categories.slice(0, 10)} />
    </div>
  );
};

export default Categories;
