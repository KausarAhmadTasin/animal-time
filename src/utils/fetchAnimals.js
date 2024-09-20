import { useAxios } from "@/hooks/useAxios";

export const fetchAnimals = async (category) => {
  const axiosUrl = useAxios();

  try {
    const res = await axiosUrl.get(`/animals?category=${category}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};
