import { useQuery } from "@tanstack/react-query"
import { supabase } from "."

export const fetchTeachers = async () => {
    const { data } = await supabase.from("teachers").select("*")
    return data
}

export const useFetchTeachers = () => {
    return useQuery({
        queryKey: ["teachers"],
        queryFn: fetchTeachers,
    });
};



export const fetchMyTeachers = async () => {
    const { data } = await supabase.from("my_teachers").select("*")
    return data
}

export const useFetchMyTeachers = () => {
    return useQuery({
        queryKey: ["my_teachers"],
        queryFn: fetchMyTeachers,
    });
};