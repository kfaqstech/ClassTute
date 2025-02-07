import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useFetchMyClasses } from '@/libs/supabase/classes';

import Classes from '@/components/Classes';

function HomeScreen() {
  const classes = useFetchMyClasses();

  return (
    <ScrollView>
      <ThemedView className='p-2'>
        {
          <Classes data={classes.data || []} />
        }
      </ThemedView>
    </ScrollView>
  );
}

export default HomeScreen
