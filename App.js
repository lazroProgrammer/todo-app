import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Button, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Dialog, Portal, Provider, TextInput } from "react-native-paper";
import TodoItem from './componants/todo_item';
  
  
export default function App(){
  const [todos, setTodos] = useState([
    { label: "Database schema", completedAt: "" },
    { label: "Database normalization", completedAt: "" },
    { label: "Database integration", completedAt: "" },
    { label: "Database integration", completedAt: "" },
    { label: "Database schema", completedAt: "" },
    { label: "Database normalization", completedAt: "" },
    { label: "Database integration", completedAt: "" },
    { label: "Database integration", completedAt: "" },
  ]);

  console.log(todos);
  // const [isModalVisible,setIsModalVisible] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newTodo,setNewTodo]= useState("")

  // A separate hook to track `checked` states
  const [checked, setChecked] = useState(Array(todos.length).fill(false));
  useEffect(() => {
    // Only update `checked` when the length of `todos` changes
    if (checked.length !== todos.length) {
      setChecked(Array(todos.length).fill(false));
    }
  }, [todos]);

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
  const addTodo = ()=>{
    if (newTodo.trim()) {
    // Add the new todo item to the list
    setTodos((prevTodos) => [...prevTodos, { label: newTodo, completedAt: "" }]
      );

    // Reset the input field
    setNewTodo("");

    // Close the dialog
    setDialogVisible(false);
  } else {
    console.log("Please enter a valid todo.");
  }
  }
  const onDelete=(index)=>{
    setTodos(todos.filter((_, i) => i !== index))
  };




  return (
    <Provider>

    <View style={styles.container}>
          <StatusBar/>
          <View style={styles.appbar}> 
            <Text style={styles.appTitle}>
            The best app
            </Text>
          </View>
          <FlatList data={todos} keyExtractor={(_item, index)=> index.toString()}
            renderItem={({item,index})=>
              <TodoItem index={index}  label={item.label} completedAt={item.completedAt} checked={checked[index]} onToggle={() => toggleChecked(index)} onDelete={()=> onDelete(index)}/>
              }>
          </FlatList>
          <View style={styles.fabContainer}>
  <TouchableOpacity style={styles.fab} onPress={() => setDialogVisible(true)}>
    <Ionicons name='add' size={30} color={"white"}/>
  </TouchableOpacity>
</View>
      {/*<Modal
        // statusBarTranslucent={true}
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        >
        <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Enter todo name"
        />
        <View style={styles.modalButtons}>
        <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        <Button title="Add Todo" onPress={addTodo} />
        </View>
        </View>
        </View>
        </Modal>*/}
      <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Add Todo</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Todo Name"
                value={newTodo}
                onChangeText={setNewTodo}
                style={styles.input}
                />
            </Dialog.Content>
            <Dialog.Actions style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setDialogVisible(false)} />
              <Button title="Add" onPress={addTodo} />
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
</Provider>
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
  modalOverlay: {
    position: 'absolute',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%", // Adjust width if necessary
    maxWidth: 400, // Max width for large screens
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Adds shadow for Android
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
