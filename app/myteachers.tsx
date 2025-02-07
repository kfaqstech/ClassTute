import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { useFetchMyTeachers } from '@/libs/supabase/teachers';

const MyTeachers = () => {
  const { data, isLoading, refetch } = useFetchMyTeachers();

  return (
    <View className='p-3 lg:p-4' style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                backgroundColor: '#f0f0f0',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 3,
              }}
            >
            
              <Text style={{ fontSize: 16, color: '#555' }}>
                time: {item.created_at}
              </Text>
             
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyTeachers;
