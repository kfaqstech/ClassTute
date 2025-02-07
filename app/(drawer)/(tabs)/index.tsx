import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useFetchClasses, useFetchMyClasses } from '@/libs/supabase/classes';

import Classes from '@/components/Classes';

function HomeScreen() {
  const classes = useFetchMyClasses();

  return (
    <ScrollView>
      <ThemedView className='p-6'>
        {
          <Classes data={classes.data || []} />
        }
       
      </ThemedView>
     
    </ScrollView>
  );
}

export default HomeScreen
