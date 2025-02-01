import { useQuery } from "@tanstack/react-query"
import { supabase } from "."

export const fetchCourses = async () => {
    const { data } = await supabase.from("courses").select("*")
    return data
}

export const fetchCourseContents = async (course_id: string) => {
  const { data } = await supabase.from("course_content").select("*").eq('course_id', course_id)
  return data
}

export const useFetchCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    });
};

export const useFetchCourseContent = (course_id: string) => {
  return useQuery({
      queryKey: ["courses", course_id],
      queryFn: () => fetchCourseContents(course_id),
  });
};