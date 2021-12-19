import React, { useState, useEffect } from "react";
import { FAB } from "react-native-paper";

import AsyncStorage from "@react-native-community/async-storage";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
} from "native-base";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import shortid from "shortid";

const Edit = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [totalNoSeason, setTotalNoSeason] = useState("");

  const [id, setId] = useState(null);

  const update = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert("Please fill both fields");
      }

      const storedValue = await AsyncStorage.getItem("@season_list");
      let list = JSON.parse(storedValue); // omitting await

      list = list.map((singleSeason) => {
        if (singleSeason.id === id) {
          singleSeason.name = name;
          singleSeason.totalNoSeason = totalNoSeason;
        }
        return singleSeason;
      });
      await AsyncStorage.setItem("@season_list", JSON.stringify(list));

      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { season } = route.params;
    const { id, name, totalNoSeason } = season;

    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // alignItems: "center",
          }}
        >
          <Heading size={"xl"} style={styles.heading}>
            Edit
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

          <Button style={{ borderRadius: 50 }} onPress={update}>
            Update
          </Button>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b262c",
    flex: 1,
    justifyContent: "flex-start",
  },
  heading: {
    textAlign: "center",
    color: "#00b7c2",
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
  },
});

export default Edit;
