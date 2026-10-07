export type ProjectCategory = "Logo Design" | "Brand Identity" | "Packaging";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  cover: string;
  behanceUrl: string;
  tags: string[];
}

// Add new projects here — they appear on the home page and /work automatically.
export const projects: Project[] = [
  {
    slug: "zestify-energy-drink",
    title: "Zestify Energy Drink",
    category: "Brand Identity",
    year: "2026",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/64b553251632289.Y3JvcCw4MDgsNjMyLDAsMA.png",
    behanceUrl:
      "https://www.behance.net/gallery/251632289/Zestify-Energy-Drink-Brand-Identity-Case-Study",
    tags: ["Brand Identity", "Packaging", "Case Study"],
  },
  {
    slug: "travel-logo-brand-identity",
    title: "Travel Logo & Brand Identity",
    category: "Logo Design",
    year: "2025",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/53a283244205615.Y3JvcCwyNTU2LDIwMDAsMTMyLDA.png",
    behanceUrl:
      "https://www.behance.net/gallery/244205615/Travel-Logo-Brand-Identity-Design",
    tags: ["Logo", "Brand Identity"],
  },
  {
    slug: "decent-furniture",
    title: "Decent Furniture",
    category: "Brand Identity",
    year: "2025",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/44dd77224832865.Y3JvcCwyNTU2LDIwMDAsMTMyLDA.png",
    behanceUrl:
      "https://www.behance.net/gallery/224832865/Decent-Furniture-Brand-Identity",
    tags: ["Brand Identity", "Logo"],
  },
];

// Filters shown on /work. "All" is handled here; other filters match against a
// project's category and tags (case-insensitive substring).
export const workFilters = ["All", "Logo", "Brand Identity", "Packaging"] as const;
export type WorkFilter = (typeof workFilters)[number];

export function projectMatchesFilter(project: Project, filter: WorkFilter) {
  if (filter === "All") return true;
  const needle = filter.toLowerCase();
  return [project.category, ...project.tags]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}
