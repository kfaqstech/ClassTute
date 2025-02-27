import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { localTime } from "@/libs/utils";

const ClassCard = ({ data }: any) => {

  return (
    <ThemedView className="p-4">
      <ThemedView className="rounded-md shadow-sm p-2">
        <ThemedView className="flex flex-row justify-between p-2 ">
          <Image
            source={data?.thumbnail || require("@/assets/images/classes.jpg")}
            style={styles.thumbnail}
          />
          <ThemedView className="gap-2">
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="access-time" size={20} color="black" />
              <ThemedText>Start :</ThemedText>
              <ThemedText>{localTime(data?.start_time)}</ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="access-time" size={20} color="black" />
              <ThemedText>End :</ThemedText>
              <ThemedText>{localTime(data?.end_time)}</ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="class" size={20} color="black" />
              <ThemedText>Class :</ThemedText>
              <ThemedText>{data?.class}</ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="subject" size={20} color="black" />
              <ThemedText>Subject :</ThemedText>
              <ThemedText>{data?.subject}</ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="language" size={20} color="black" />
              <ThemedText>Language :</ThemedText>
              <ThemedText>{data?.language}</ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-row gap-2 items-center">
              <MaterialIcons name="person" size={20} color="black" />
              <ThemedText>Participents :</ThemedText>
              <ThemedText>{data?.batch_size}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView className="p-2 flex-row justify-between items-center">
          <ThemedView>
            <ThemedText className="font-bold">{data?.name}</ThemedText>
            <ThemedText className="text-sm">{data?.description}</ThemedText>
          </ThemedView>
          <Pressable
            className="py-1 px-2 shadow-sm bg-gray-200 rounded-md"
            onPress={() => { }}
          >
            <ThemedText className="text-sm font-bold">View Detail</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

    </ThemedView>
  );
};

export default ClassCard;

const styles = StyleSheet.create({
  thumbnail: {
    width: 150,
    height: 150,
  },
});
