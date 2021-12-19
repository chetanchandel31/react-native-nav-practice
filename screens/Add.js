import AsyncStorage from "@react-native-community/async-storage";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
} from "native-base";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import shortid from "shortid";

const Add = ({ navigation }) => {
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const [name, setName] = useState();
  const [totalNoSeason, setTotalNoSeason] = useState();

  // scrollview = no fixed height
  // wrap it in view with flex: 1 for something like backgroundColor, when scrollview isn't long enough to cover entire screen

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return setSnackbarVisible(true);
      }

      const seasonToAdd = {
        name,
        totalNoSeason,
        isWatched: false,
        id: `s-${shortid.generate()}`,
      };

      const storedValue = await AsyncStorage.getItem("@season_list");
      const prevList = JSON.parse(storedValue); // omitting await

      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem("@season_list", JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem("@season_list", JSON.stringify(prevList));
      }

      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // alignItems: "center",
        }}
      >
        <Heading size={"xl"} style={styles.heading}>
          Add to watchlist
        </Heading>

        <FormControl>
          <Stack space={0}>
            <Stack>
              {/* <FormControl.Label>Username</FormControl.Label> */}
              <Input
                style={{ color: "#eee" }}
                variant="rounded"
                p={2}
                marginBottom={"20px"}
                placeholder="Season name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Stack>
            <Stack>
              {/* <FormControl.Label>Password</FormControl.Label> */}
              <Input
                style={{ color: "#eee" }}
                variant="rounded"
                p={2}
                marginBottom={"20px"}
                placeholder="Total no. of seasons"
                value={totalNoSeason}
                onChangeText={(text) => setTotalNoSeason(text)}
                keyboardType="numeric"
              />
            </Stack>
          </Stack>
        </FormControl>

        <Button style={{ borderRadius: 50 }} onPress={addToList}>
          Add
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={2000}
        >
          Please fill both fields
        </Snackbar>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b262c",
    flex: 1,
    justifyContent: "flex-start",
    // new
    borderWidth: 2,
    // width: "100%",
    // maxWidth: 10000,
    // alignItems: ""
  },
  heading: {
    textAlign: "center",
    color: "#00b7c2",
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
    // borderWidth: 2,
  },
  formItem: {
    marginBottom: 20, // using marginBottom={"20px"} on Input component instead
  },
});

export default Add;
