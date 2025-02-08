import React from 'react'
import { FlatList, Pressable, View, StyleSheet } from 'react-native'
import { useFetchCourses } from '@/libs/supabase/courses'
import { ThemedView } from '@/components/ThemedView';

import TextBox from '@/components/shared/TextBox';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CourseCard from '@/components/courses/CourseCard';

const Courses = () => {
  const { data } = useFetchCourses();
  console.log("courses", data)
  return (
    <ThemedView>
      <ThemedView className="p-4 flex-row items-center gap-4 rounded-lg">
        <View style={{ flex: 1 }}>
          <TextBox
            placeholder="Search Course ..."
            style={styles.searchInput}
          />
        </View>
        <Pressable className="bg-gray-200 rounded-md p-2">
          <MaterialIcons name="search" size={20} color="black" />
        </Pressable>
        <Pressable className="bg-gray-200 rounded-md p-2">
          <MaterialIcons name="filter-list-alt" size={20} color="black" />
        </Pressable>
      </ThemedView>
      <FlatList
        data={data || []}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={item => item.id} />
    </ThemedView>
  )
}

export default Courses;

const styles = StyleSheet.create({
  searchInput: {
    width: "100%",
  },
});
