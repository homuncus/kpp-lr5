import { Text, Button, View, DeviceEventEmitter } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function ToDoScreen({ navigation, route }) {
  const { item } = route.params;
  const todo = item

  function removeTodo() {
    DeviceEventEmitter.emit('todo.delete', item)
    navigation.navigate('Home')
  }

  function checkTodo() {
    item.checked = !item.checked
    DeviceEventEmitter.emit('todo.check', item)
  }

  return (
    <View className="m-4">
      <View className="bg-white px-4 py-3">
        <Text className="text-center font-semibold">{todo.title}</Text>
      </View>
      <View className="row-auto">
        <Button className="col-auto px-3 py-2 bg-red-600" title='Delete' onPress={removeTodo} />
        <View className="flex flex-row col-auto">
          <Text>Done: </Text>
          <CheckBox checked={item.checked} onTouchEnd={checkTodo}></CheckBox>
        </View>
      </View>
    </View>
  );
}
