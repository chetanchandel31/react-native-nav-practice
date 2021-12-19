import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Add, Edit, Home } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Add"
              component={Add}
              options={{
                headerStyle: { backgroundColor: "#0f4c75" },
                title: "netflix clone",
                headerTitleStyle: {
                  textAlign: "center",
                  color: "#00b7c2",
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerStyle: { backgroundColor: "#0f4c75" },
                title: "netflix clone",
                headerTitleStyle: {
                  textAlign: "center",
                  color: "#00b7c2",
                },
              }}
            />
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{
                headerStyle: { backgroundColor: "#0f4c75" },
                title: "netflix clone",
                headerTitleStyle: {
                  textAlign: "center",
                  color: "#00b7c2",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
    // <View>
    //   <Text>oo</Text>
    //   <TouchableOpacity>
    //     <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

export default App;
