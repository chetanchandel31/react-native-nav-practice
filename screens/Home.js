import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import {
  Fab,
  Icon,
  AddIcon,
  Heading,
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
  Spacer,
  Checkbox,
  Spinner,
} from "native-base";
import { Button, FAB, IconButton } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    try {
      setLoading(true);

      const storedValue = await AsyncStorage.getItem("@season_list");

      if (!storedValue) {
        setListOfSeasons([]);
      }

      const list = JSON.parse(storedValue);
      setListOfSeasons(list);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSeason = async (id) => {
    const newList = listOfSeasons.filter((list) => list.id !== id);

    setListOfSeasons(newList);
    await AsyncStorage.setItem("@season_list", JSON.stringify(newList));
  };

  const markComplete = async (id) => {
    const newArr = listOfSeasons.map((season) => {
      if (season.id === id) {
        season.isWatched = !season.isWatched;
      }

      return season;
    });

    setListOfSeasons(newArr);
    await AsyncStorage.setItem("@season_list", JSON.stringify(newArr));
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner size={"lg"} />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {listOfSeasons?.length === 0 ? (
          <View style={styles.container}>
            <Heading size={"xl"} style={styles.heading}>
              Watchlist is empty
            </Heading>
          </View>
        ) : (
          <>
            <Heading size={"xl"} style={styles.heading}>
              Next series to watch
            </Heading>

            {listOfSeasons.map((season) => (
              <Box
                // borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
                key={season.id}
              >
                <HStack justifyContent="space-between">
                  <IconButton
                    icon="delete"
                    onPress={() => deleteSeason(season.id)}
                    style={{ marginHorizontal: 0 }}
                    color="#f43f5e"
                  ></IconButton>
                  <IconButton
                    icon="pencil"
                    onPress={() => navigation.navigate("Edit", { season })}
                    style={{ marginHorizontal: 0 }}
                    color="#0e7490"
                  ></IconButton>
                  <VStack>
                    <Text bold style={styles.seasonName}>
                      {season.name}
                    </Text>
                    <Text style={{ color: "white" }}>
                      {season.totalNoSeason} seasons to watch
                    </Text>
                  </VStack>
                  <Spacer />
                  <Checkbox
                    isChecked={season.isWatched}
                    onChange={() => markComplete(season.id)}
                    accessibilityLabel="checkbox"
                  />
                </HStack>
              </Box>
            ))}
          </>
        )}

        {/* <Fab
          placement="bottom-right"
          // colorScheme="blue"
          // size="lg"
          icon={<AddIcon size={5} />}
          onPress={() => navigation.navigate("Edit")}
          style={{ backgroundColor: "green", position: "absolute", zIndex: 1 }}
        /> */}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate("Add")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: "#0e7490",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#1b262c",
    // flexGrow: 1,
    flex: 1,
  },
  heading: {
    textAlign: "center",
    color: "#00b7c2",
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: "#fdcb9e",
    textAlign: "justify",
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#0e7490",
  },
});

export default Home;
