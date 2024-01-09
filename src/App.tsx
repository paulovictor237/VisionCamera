import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import { Home } from './screens/Home';
import { RoutesScreen } from './screens/RoutesScreen';

const Stack = createNativeStackNavigator<Routes>();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Routes">
        <Stack.Screen name="Routes" component={RoutesScreen} />
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{
          //   headerStyle: { backgroundColor: 'transparent' },
          //   headerTransparent: true,
          //   statusBarStyle: 'auto',
          //   statusBarTranslucent: true,
          //   statusBarColor: 'transparent',
          //   title: '',
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
