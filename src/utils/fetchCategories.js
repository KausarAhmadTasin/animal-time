import { useAxios } from "@/app/hooks/useAxios";

export const fetchCategories = async () => {
  const axiosUrl = useAxios();

  try {
    const res = await axiosUrl.get(`/categories`);
    return res.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};
