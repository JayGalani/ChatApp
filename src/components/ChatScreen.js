import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {getRoomMessages} from '../api/api';
import {io} from 'socket.io-client';

const ChatScreen = ({route, navigation}) => {
  const {roomId, roomName, username, userId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  let newSocket = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: roomName,
    });
  }, [navigation, roomName]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const initialMessages = await getRoomMessages(roomId);
        setMessages(initialMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [roomId]);

  console.log('newSocket.current', newSocket.current);

  useEffect(() => {
    const WEBSOCKET_URL = 'ws://chat-api-k4vi.onrender.com';
    newSocket.current = io(WEBSOCKET_URL, {
      transports: ['websocket'],
      query: {roomId, username},
    });

    newSocket.current.on('connect', () =>
      console.log('Connected to WebSocket Chat screen'),
    );
    newSocket.current.on('message', msg => setMessages(prev => [...prev, msg]));

    // const WEBSOCKET_URL = `ws://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
    // newSocket.current = io(WEBSOCKET_URL);
    // newSocket.current.on('connect', () =>
    //   console.log('Connected to WebSocket Chat screen'),
    // );
    // newSocket.current.on('message', msg => setMessages(prev => [...prev, msg]));

    return () => {
      if (newSocket.current) {
        newSocket.current.disconnect();
      }
    };
  }, [roomId, username]);

  console.log('Messages ::--', messages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      newSocket.current.emit('sendMessage', {
        event: 'message',
        content: newMessage,
      });

      const messageObj = {
        roomId: roomId,
        username: username,
        content: newMessage,
        user_id: userId,
      };
      setMessages(prev => [...prev, messageObj]);

      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={[
                styles.messageBubble,
                item.user_id === userId
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          );
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200EE',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
