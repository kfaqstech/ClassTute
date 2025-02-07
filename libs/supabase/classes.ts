import { useQuery } from "@tanstack/react-query";
import { supabase } from ".";

export const fetchClasses = async () => {
  const { data } = await supabase.from("classes").select("*");
  return data;
};

export const fetchMyClasses = async () => {
  const { data, error } = await supabase.from("my_classes").select("*, classes(*)");
  return data;
};

export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });
};

export const useFetchMyClasses = () => {
  return useQuery({
    queryKey: ["myclasses"],
    queryFn: fetchMyClasses,
  });
};
