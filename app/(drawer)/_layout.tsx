import Avatar from '@/components/Avatar';
import DrawerMenu from '@/components/DrawerMenu';
import withAuth from '@/components/hoc/withAuth';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';

const DrawerLayout = (props: any) => {
  return (
    <Drawer drawerContent={(props) => <DrawerMenu {...props} />} screenOptions={{
      title: "",
      headerLeft: () => <View className='px-4 py-1'><Avatar/></View>
    }} />
  )
}
export default withAuth(DrawerLayout);
