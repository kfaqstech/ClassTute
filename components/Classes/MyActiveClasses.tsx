import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import ActiveClassCard from './ActiveClassCard';


const MyActiveClasses = ({ classes }: any) => {
  const { width } = useWindowDimensions()

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={140}
        data={classes.data || []}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <ActiveClassCard item={item} />}
      />
    </View>
  )
}

export default MyActiveClasses