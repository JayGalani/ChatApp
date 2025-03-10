import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {setUsername} from '../api/api';

const UsernameScreen = ({navigation}) => {
  const [username, setUsernameState] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetUsername = () => {
    if (username.trim() === '') {
      setError('Username cannot be empty.');
      return;
    }
    setError('');
    try {
      setLoading(true);
      setUsername(username).then(res => {
        navigation.navigate('RoomList', {
          userId: res?.id,
          username: res?.username,
        });
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(`${err} Failed to set username. Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Username</Text>

      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={text => setUsernameState(text)}
        style={styles.input}
        error={!!error}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSetUsername}>
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
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  // button: {
  //   width: '90%',
  //   marginTop: 10,
  // },
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
  },
});

export default UsernameScreen;
