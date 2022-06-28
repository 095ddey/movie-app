import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';

const FirstScreen = () => {
  const apiurl = 'http://www.omdbapi.com/?apikey=98f5baca';
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = () => {
    fetch(`${apiurl}&s=${search}`)
      .then(res => res.json())
      .then(resultArray => setSearchResults(resultArray.Search));
  };
  const movie = ({item}) => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={{uri: item.Poster}}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.Title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Movie DB</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText={setSearch}
        value={search}
        placeholder="Enter a movie..."
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}> Search </Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        renderItem={movie}
        keyExtractor={item => item.imdbID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  txt: {
    fontSize: 32,
    // fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    margin: 20,
    color: 'white',
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    textAlign: 'center',
  },
  btn: {
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    alignself: 'center',
  },
  img: {
    width: '100%',
    height: 400,
    flex: 1,
  },
  item: {
    flex: 1,
  },
});

export default FirstScreen;
