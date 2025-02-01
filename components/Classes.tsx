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
    <ThemedView className="shadow-md p-2">
      <ImageBackground source={require('@/assets/images/partial-react-logo.png')} style={styles.thumbnail} />
      <ThemedText>Live</ThemedText>
      <ThemedText>{data?.name}</ThemedText>
      <ThemedText>{data?.description}</ThemedText>
      <ThemedView className="flex-row justify-end">
      <Pressable className="bg-red" onPress={joinClass}><ThemedText>Join Class</ThemedText></Pressable>
      </ThemedView>
      
    </ThemedView>
  )
}

const Classes = (props: IClassesProps) => {
  const { data } = props;

  return (
    <ScrollView>
      <ThemedView className="p-2">
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
    height: 100,

  },
});