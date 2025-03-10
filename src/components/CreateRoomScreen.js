import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {createRoom} from '../api/api';

const CreateRoomScreen = ({navigation}) => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setError('');
    if (roomName.trim() !== '') {
      try {
        setLoading(true);
        createRoom(roomName).then(res => {
          if (res?.status === 200 || res?.status === 201) {
            navigation.navigate('Chat', {
              roomId: res?.data?.id,
              roomName: res?.data?.name,
              userName: res?.data?.name,
            });
            setLoading(false);
          } else if (res?.status === 400) {
            setError(res?.data?.detail);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    } else {
      setError('Please enter room name!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Room</Text>
      <TextInput
        style={styles.input}
        value={roomName}
        onChangeText={setRoomName}
        placeholder="Enter Room Name"
        placeholderTextColor="#888"
      />
      {error || roomName?.length === 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
        {loading ? (
          <ActivityIndicator color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.buttonText}>Create Room</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default CreateRoomScreen;
