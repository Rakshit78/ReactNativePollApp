import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Jsondata from '../screens/Jsondata';
import List from '../screens/List';

const { Navigator, Screen } = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='List'>
        <Screen name='List' component={List} />
        <Screen name='Jsondata' component={Jsondata} />
      </Navigator>
    </NavigationContainer>
  );
}
