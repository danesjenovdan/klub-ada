"use client";

import { useSanityData } from "@/src/app/utils/use-sanity-data";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";

const FILTERS_QUERY = `*[_type == "category"] {
  'label': coalesce(title[$language], title.sl),
  slug
}`;

type FilterProps = {
  isSelected: boolean;
  label: string;
  handleSelectFilter: () => void;
};

function Filter({ isSelected, label, handleSelectFilter }: FilterProps) {
  return (
    <button
      onClick={handleSelectFilter}
      className={clsx(
        "rounded-[10px] border-black border py-1.5 px-3 uppercase font-button text-xs font-semibold leading-4",
        isSelected ? "text-black bg-pink" : "text-pink bg-white"
      )}
    >
      {label}
    </button>
  );
}

type CategoryType = {
  label: string;
  _id: string;
  slug: {
    current: string;
  };
};
type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategoryAction: (category: string | null) => void;
};
export function Filters({
  selectedCategory,
  setSelectedCategoryAction,
}: FiltersProps) {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const { data } = useSanityData({
    query: FILTERS_QUERY,
    params: { language: locale },
  });

  console.log(locale);
  const categories = (data || []) as CategoryType[];

  console.log("Categories:", categories);
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      <Filter
        label={t("all")}
        isSelected={selectedCategory === null}
        handleSelectFilter={() => setSelectedCategoryAction(null)}
      />
      {categories.map((category, index) => (
        <Filter
          key={index}
          label={category.label}
          isSelected={selectedCategory === category.slug.current}
          handleSelectFilter={() =>
            setSelectedCategoryAction(category.slug.current)
          }
        />
      ))}
    </div>
  );
}
