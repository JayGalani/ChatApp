import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {getRooms} from '../api/api';

const RoomList = ({navigation, route}) => {
  const {userId, username} = route?.params;

  const [rooms, setRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setRefreshing(true);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      return error;
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Room</Text>

      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchRooms} />
        }
        renderItem={({item}) => {
          return (
            <Card
              style={styles.roomCard}
              onPress={() =>
                navigation.navigate('Chat', {
                  roomId: item?.id,
                  roomName: item?.name,
                  username: username,
                  userId: userId,
                })
              }>
              <Card.Title title={item.name} titleStyle={styles.roomTitle} />
            </Card>
          );
        }}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateRoom')}
        style={styles.button}>
        Create Room
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 10,
  },
  roomCard: {
    marginHorizontal: 10,
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200EE',
  },
});

export default RoomList;
