// import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { useLearningPosts } from '@/libs/supabase/explore';
// import { useCallback } from 'react';


// interface LearningPostProps {
//   data: any
// }

// const LearningPost = (props: LearningPostProps) => {
//   const { data } = props
//   return (
//     <ThemedView className='shadow-lg p-2'>
//       <ThemedText className='font-bold text-lg'>{data.title}</ThemedText>
//       <ThemedText className='text-md'>{data.content}</ThemedText>
//     </ThemedView>
//   )
// }

// export default function TabTwoScreen() {
//   const { data, isLoading, refetch } = useLearningPosts()

//   const onRefresh = useCallback(() => {
//     refetch()
//   }, []);

//   return (
//     <ScrollView refreshControl={
//       <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
//     }>

//       <ThemedView className='p-4 gap-4'>

//         {
//           data?.map((lp: any) => {
//             return <View key={lp.id}>
//               <LearningPost data={lp} />
//             </View>
//           })
//         }

//       </ThemedView>
//     </ScrollView>
//   );
// }



// const styles = StyleSheet.create({

//   editorContainer: {
//     flex: 1,
//     minHeight: 470,
//     marginVertical: 10,
//   },

// });


import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import LexicalEditor from '@/components/LexicalEditor';
import { WebView } from 'react-native-webview';

export default function Explore() {
  const [posts, setPosts] = useState<string[]>([]);

  const handleShare = (content: string) => {
    setPosts((prevPosts) => [content, ...prevPosts]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.createPostHeader}>Create Post</Text>
      <View style={styles.editorContainer}>
        <LexicalEditor onShare={handleShare} />
      </View>
      <View className='pt-10'>
      <Text style={styles.header}>Explore</Text>

        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <WebView
              originWhitelist={['*']}
              source={{
                html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body { 
                  font-size: 16px; 
                  padding: 10px; 
                  margin: 0; 
                  color: #333; 
                  font-family: Arial, sans-serif;
                }
              </style>
            </head>
            <body>${post}</body>
          </html>
        `
              }}
              style={styles.postContent}
              scrollEnabled={false}
            />
          </View>

        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,

    backgroundColor: '#fff',
  },
  createPostHeader: {
    fontSize: 28,
    fontWeight: 'bold',
   
    textAlign: 'center',
    color: '#007AFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  editorContainer: {
    flex: 1,
    minHeight: 520,
    marginVertical: 5,
  },
  postCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    minHeight: 200
  },
  postContent: {
    minHeight: 200,
  },
});
