import { ActivityIndicator, FlatList,View } from 'react-native'
import React, { useCallback } from 'react'

import { teachersData } from '@/constants/TeachersData';
import TutorCard from '@/components/TutorCard';
import { useFetchTeachers } from '@/libs/supabase/teachers';


const Teachers = () => {
   const { data ,isLoading, refetch} = useFetchTeachers();
    
   
  return (

   
    <View className='p-3 lg:p-4 ' style={{flex:1}}>
    {isLoading?(<ActivityIndicator/>):
    (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />} 
      renderItem={({ item }) => <TutorCard teacher={item} />}
      keyExtractor={item => item.id}
      
       />
    )}
  </View>
  )
}

export default Teachers

