import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

  
const TodoItem = ({ label, completedAt, checked, onToggle }) => {
    const scale = useSharedValue(checked ? 1 : 0);

    React.useEffect(() => {
      scale.value = withSpring(checked ? 1 : 0, { stiffness: 800 });
    }, [checked]);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return (
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

