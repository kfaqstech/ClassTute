import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';;
import CourseSuggestedCard from './CourseSuggestedCard';

const SuggestedCourse = ({ courses }: any) => {
  const { width } = useWindowDimensions()

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={courses || []}
        autoPlayInterval={10000}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <CourseSuggestedCard course={item} />}
      />
    </View>
  )
}

export default SuggestedCourse