import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import ClassCard from './ClassCard';

const SuggestedClasses = ({ classes }: any) => {
  const { width } = useWindowDimensions()

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={classes || []}
        autoPlayInterval={10000}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <ClassCard data={item} />}
      />
    </View>
  )
}

export default SuggestedClasses