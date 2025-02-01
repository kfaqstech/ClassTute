import { useQuery } from "@tanstack/react-query"
import { supabase } from "."

export const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("*")
    return data
}

export const useFetchClasses = () => {
    return useQuery({
        queryKey: ["classes"],
        queryFn: fetchClasses,
    });
};