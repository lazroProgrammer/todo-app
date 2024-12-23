import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

  
const TodoItem = ({index, label, completedAt, checked, onToggle, onDelete}) => {
  const swipeableRef = React.useRef(null);
    const scale = useSharedValue(checked ? 1 : 0);

    React.useEffect(() => {
      scale.value = withSpring(checked ? 1 : 0, { stiffness: 800 });
    }, [checked]);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const resetSwipe = () => {
      if (swipeableRef.current) {
        swipeableRef.current.close(); // Close the swipe manually
      }
    };

    const handleDelete=()=>{
      onDelete(index)
      resetSwipe()
  
    }

    const handleEdit=()=>{
      // onDelete(index)
      resetSwipe()
  
    }

    
    const rightSwipeActions = (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            width: 80,
            height: '100%',
            marginLeft: 10,
            borderRadius: 10,
            paddingRight: 10,
          }}
        >
          <Ionicons name="trash-bin" size={30} color="white" />
        </Animated.View>
      </View>
    );

    const leftSwipeActions = (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            width: 80,
            height: '100%',
            marginRight: 10,
            borderRadius: 10,
            paddingLeft: 10,
          }}
        >
          <Ionicons name="create" size={30} color="white" />
        </Animated.View>
      </View>
    );

    return (
      <GestureHandlerRootView>
      <Swipeable 
                  // cancelsTouchesInView={true} 
                  ref={swipeableRef}
                  renderRightActions={() => rightSwipeActions}
                  renderLeftActions={() => leftSwipeActions}
                  onSwipeableRightOpen={() => handleDelete()} // Trigger delete on swipe right
                  onSwipeableLeftOpen={() => handleEdit()} // Trigger edit on swipe left
                >

      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.status}>
            {completedAt ? `Completed: ${completedAt}` : "Pending"}
          </Text>
        </View>
        <Pressable style={[styles.checkButton, checked && styles.checkedButton]} onPress={onToggle}>
        <Animated.View style={[styles.checkMark, animatedStyle]}>
          <Text style={styles.checkIcon}>✓</Text>
        </Animated.View>
      </Pressable>
          {/* <Text style={styles.buttonText}>
            {completedAt ? "Undo" : "Complete"}
            </Text> */}

      </View>
            </Swipeable>
            </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f9f9f9",
      padding: 15,
      marginVertical: 5,
      marginHorizontal:8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    info: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    status: {
      fontSize: 14,
      color: "#666",
      marginTop: 5,
    },
    // button: {
    //   paddingVertical: 8,
    //   paddingHorizontal: 15,
    //   borderRadius: 5,
    // },
    completedButton: {
      backgroundColor: "#4caf50", // Green for completed
    },
    pendingButton: {
      backgroundColor: "#f44336", // Red for pending
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    checkButton: {
      width: 28,
      height: 28,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "teal",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
    },
    checkedButton: {
      backgroundColor: "teal",
    },
    checkMark: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    checkIcon: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  
  export default TodoItem;

