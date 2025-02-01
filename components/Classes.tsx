import { ImageBackground, Pressable, ScrollView, View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView"
import { useRouter } from "expo-router";

interface IClasseViewProps {
  data: any
}

interface IClassesProps {
  data: any
}


const ClassView = (props: IClasseViewProps) => {
  const { data } = props;
  const router = useRouter();

  const joinClass = () => {
    router.push({
      pathname: '/live',
      params: { class_id: data.class_id, name: data.name },
    });
  };

  return (
    <ThemedView className="shadow-md">
      <ThemedView>
        <ImageBackground source={ data.thumbnail || require('@/assets/images/classes.jpg')} style={styles.thumbnail} />
      </ThemedView>
      <ThemedText className="font-bold mt-4">{data?.name}</ThemedText>
      <ThemedText className="text-sm">{data?.description}</ThemedText>
      <ThemedView className="flex-row justify-end p-2">
        <Pressable className="py-1 px-2 shadow-md bg-gray-200 rounded-md" onPress={joinClass}>
          <ThemedText className="text-sm font-bold">Join Class</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  )
}

const Classes = (props: IClassesProps) => {
  const { data } = props;

  return (
    <ScrollView>
      <ThemedView>
        {
          data.map((d: any) => {
            return <View key={d.id}><ClassView data={d} /></View>
          })
        }
      </ThemedView>


    </ScrollView>
  )
}

export default Classes;


const styles = StyleSheet.create({
  thumbnail: {
    height: 150,
  },
});