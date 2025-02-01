import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useFetchClasses } from '@/libs/supabase/classes';

import Classes from '@/components/Classes';

export default function HomeScreen() {
  const classes = useFetchClasses();

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
