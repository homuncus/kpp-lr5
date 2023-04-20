import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableHighlight, View, Button, DeviceEventEmitter } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [todo, setTodo] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [todos, setTodos] = useState([]);

  function addTodo() {
    setTodos(todos.concat({ id: todoId, title: todo, checked: false }));
    setTodo('');
    setTodoId(todoId + 1);
  }

  function removeTodo({ id }) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function checkUncheck({ id }) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    }))
  }

  DeviceEventEmitter.addListener('todo.delete', removeTodo);
  DeviceEventEmitter.addListener('todo.check', checkUncheck);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#dddddd"
      onPress={() => navigation.navigate('ToDo', { item })}
      className="max-h-16"
    >
      <View className="flex items-center py-3 px-4 bg-white border-b-2 border-r-2 border-gray-200 mt-2 mx-4 rounded-lg">
        <Text className="text-gray-800 text-lg font-semibold">{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return <>
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item ? item.id.toString() : '0'}
    />
    <View className="flex flex-row items-center py-2 px-4 bg-white border border-gray-200 bottom-6 h-14 mx-6 w-min rounded-xl">
      <TextInput value={todo} onChangeText={val => setTodo(val)} className="flex-1 bg-transparent focus:outline-none" placeholder="Add a to-do item..." />
      <Button className="bg-blue-600 rounded-full p-2 ml-6 text-xl" title="+" onPress={addTodo} />
    </View>
  </>;
}
