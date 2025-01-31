import { useQuery } from "@tanstack/react-query"
import { supabase } from "."

export const fetchLearningPosts = async () => {
    const { data } = await supabase.from("learning_posts").select("*")
    return data
}

export const useLearningPosts = () => {
    return useQuery({
        queryKey: ["learningposts"],
        queryFn: fetchLearningPosts,
    });
};