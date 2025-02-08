import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";

import ClassCard from "./classes/ClassCard";

interface IClasseViewProps {
  data: any;
}

interface IClassesProps {
  data: any;
}

const ClassView = (props: IClasseViewProps) => {
  const { data } = props;
  const router = useRouter();



  const joinClass = () => {
    router.push({
      pathname: "/live",
      params: { class_key: data.classes.class_key, name: data.classes.name, token: data?.token },
    });
  };

  return (
    <ThemedView className="p-2">
      <ThemedView className="shadow-md rounded-sm p-2">
        <ClassCard data={data.classes} />
        <ThemedText className="font-bold mt-4">{data?.classes?.name}</ThemedText>
        <ThemedText className="text-sm">{data?.classes?.description}</ThemedText>
        <ThemedView className="flex-row justify-end p-2">
          <Pressable
            className="py-1 px-2 shadow-md bg-gray-200 rounded-md"
            onPress={joinClass}
          >
            <ThemedText className="text-sm font-bold">Join Class</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>

  );
};

const Classes = (props: IClassesProps) => {
  const { data } = props;

  return (
    <ScrollView>
      <ThemedView>
        {data.map((d: any) => {
          return (
            <View key={d.id}>
              <ClassView data={d} />
            </View>
          );
        })}
      </ThemedView>
    </ScrollView>
  );
};

export default Classes;

const styles = StyleSheet.create({
  thumbnail: {
    width: 150,
    height: 150,
  },
});
