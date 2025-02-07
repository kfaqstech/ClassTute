

import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

type TutorCardProps = {
  teacher: {
    name: string;
    image_url: string;
    rating: number;
    reviews: number;
    fees_per_month: number;
    duration: string;
    activeStudents: number;
    lessons: number;
    languages: string[];
    subjects: string[];
    bio: string;
  };
};

const TutorCard: React.FC<TutorCardProps> = ({ teacher }) => {
  return (
    <View className="bg-white p-3 lg:p-8 rounded-lg">
      <View className="flex-row items-center lg:items-start gap-5 lg:gap-20">
  
        <Image source={{ uri: teacher.image_url }} className="w-20 h-24 lg:w-64 lg:h-64 rounded-md" />

        <View className="ml-4 lg:ml-10">
          <View className="flex-row items-center gap-2 ">
            <Text className="text-lg lg:text-4xl font-bold">{teacher.name}</Text>
            <Image source={{ uri: 'https://img.icons8.com/?size=50&id=poVlgAcqxww6&format=png' }} className="w-5 h-5 lg:w-6 lg:h-6" />
          </View>
          <Text className="text-sm lg:text-xl text-gray-500 font-bold">Super Tutor</Text>

          <View className="mt-3 lg:mt-8 flex-row justify-between gap-24">
            <Text className="text-sm lg:text-2xl">⭐ {teacher.rating}</Text>
            <Text className="text-sm lg:text-2xl font-bold">₹ {teacher.fees_per_month}</Text>
          </View>

          <View className="mt-1 flex-row justify-between gap-20 md:gap-32">
            <Text className="text-gray-500 text-xs lg:text-lg">{teacher.reviews} Reviews</Text>
            <Text className="text-gray-500 text-xs lg:text-lg">{teacher.duration}-min lesson</Text>
          </View>
        </View>
      </View>

    
      <View className="mt-4 lg:mt-10">
        <Text className="text-gray-700 text-sm lg:text-2xl">
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12129/12129581.png' }} className="w-3 h-3 lg:w-5 lg:h-5" /> {teacher.activeStudents} active students • {teacher.lessons} lessons
        </Text>
        <Text className="text-gray-500 text-sm lg:text-2xl mt-1">
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/565/565635.png' }} className="w-3 h-3 lg:w-5 lg:h-5" /> Speaks: {teacher.languages}
        </Text>
      </View>

      <Text className="mt-4 text-gray-700 text-sm lg:text-2xl">Expertise: {teacher.subjects}</Text>
      <Text className="mt-4 text-gray-700 text-xs lg:text-lg">{teacher.bio}</Text>

      <Pressable className="bg-pink-500 py-2 rounded-lg mt-4 lg:mt-8">
        <Text className="text-center lg:text-xl text-white font-bold">Book trial lesson</Text>
      </Pressable>
    </View>
  );
};

export default TutorCard;
