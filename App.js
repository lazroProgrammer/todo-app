import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TodoItem from './componants/todo_item';
  
  
export default function App(){
  const [todos, setTodos] = useState([
    { label: "Database schema", completedAt: "" },
    { label: "Database normalization", completedAt: "" },
    { label: "Database integration", completedAt: "" },
    { label: "Database integration", completedAt: "" },
  ]);

  // A separate hook to track `checked` states
  const [checked, setChecked] = useState(Array(todos.length).fill(false));

  const toggleChecked = (index) => {
    setChecked((prevChecked) =>
      prevChecked.map((value, i) => (i === index ? !value : value))
    );

    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index
          ? { ...todo, completedAt: !checked[index] ? new Date().toLocaleString() : "" }
          : todo
      )
    );}
  return (
    <View style={styles.container}>
          <StatusBar/>
          <View style={styles.appbar}> 
            <Text style={styles.appTitle}>
            The best app
            </Text>
          </View>
          <FlatList data={todos} keyExtractor={(_item, index)=> index.toString()}
            renderItem={({item,index})=><TodoItem  label={item.label} completedAt={item.completedAt} checked={checked[index]} onToggle={() => toggleChecked(index)}/>}>
          </FlatList>
          <View style={styles.fabContainer}>
  <TouchableOpacity style={styles.fab} onPress={() => console.log("FAB clicked!")}>
    <Ionicons name='add' size={30} color={"white"}/>
  </TouchableOpacity>
</View>
    </View>
  );
};
// const todos= [{
//   "label":"database shema",
//   "checked":false,
//   "completedAt":"",
// },{
//   "label":"database normalization",
//   "checked":true,
//   "completedAt":"",
// },{
//   "label":"database integration",
//   "checked":false,
//   "completedAt":"",
// },]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbar: {
    height: 60,
    backgroundColor: "teal",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom:6,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  appTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  listContent: {
    padding: 10,
  },
  fabContainer: {
    position: "absolute",
    bottom: 20, // Distance from the bottom
    left: "50%",
    transform: [{ translateX: -28 }], // Half of FAB size to center
  },
  fab: {
    width: 56,
    height: 56,
    backgroundColor: "teal", // Primary color
    borderRadius: 28, // Half of width/height for a circle
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
