"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHamburger,
  faPizzaSlice,
  faCookie,
  faBirthdayCake,
  faCircleDot, // Better representation for Donut
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type CategoryIconProps = {
  category: Category;
};

const iconMap: { [key: string]: IconDefinition } = {
  cafe: faCoffee,
  hamburguesa: faHamburger,
  pizza: faPizzaSlice,
  galletas: faCookie,
  pastel: faBirthdayCake,
  dona: faCircleDot, // Better representation for Donut
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  const params = useParams<{ category: string }>();
  return (
    <div
      className={`${
        category.slug === params.category ? "text-orange-400" : "text-slate-700"
      } flex w-full pl-10 py-5 items-center gap-4 hover:text-orange-400`}
    >
      <FontAwesomeIcon icon={iconMap[category.slug]} />

      <Link
        href={`/order/${category.slug}`}
        className="text-xl transition-colors"
      >
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
