import { StyleSheet, FlatList, Pressable, View } from "react-native";
import React, { useState } from "react";
import { useFetchClasses } from "@/libs/supabase/classes";
import { SafeAreaView } from "react-native-safe-area-context";
import ClassCard from "@/components/Classes/ClassCard";
import TextBox from "@/components/shared/TextBox";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import TextButton from "@/components/shared/TextButton";

const ItemView = ({ item }: any) => {
  return (
    <ThemedView className="p-4">
      <ThemedView className="shadow-sm rounded-md">
        <ThemedView>
          <ClassCard data={item} />
        </ThemedView>
        <ThemedView className="flex-row justify-between p-4">
          <ThemedView>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText>{item.description}</ThemedText>
          </ThemedView>
          <ThemedView className="flex-row gap-2">
            <ThemedText> Fees</ThemedText>
            <ThemedText> 100Rs / Month</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView className="p-2">
          <TextButton title="Subscribe" />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const Classes = () => {
  const classes = useFetchClasses();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <ThemedView>
      <ThemedView className="p-4 flex-row items-center gap-4 rounded-lg">
        <View style={{ flex: 1 }}>
          <TextBox
            placeholder="Search Class ..."
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
      <ThemedView>
        <FlatList
          data={classes.data || []}
          renderItem={({ item }) => <ItemView item={item} />}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>
    </ThemedView>

  );
};

export default Classes;

const styles = StyleSheet.create({
  searchInput: {
    width: "100%",
  },
});
