import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen'
import ToDoScreen from './components/ToDoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
