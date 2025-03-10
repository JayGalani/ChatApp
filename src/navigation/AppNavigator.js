import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UsernameScreen from '../components/UsernameScreen';
import CreateRoomScreen from '../components/CreateRoomScreen';
import ChatScreen from '../components/ChatScreen';
import RoomList from '../components/RoomList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#6200EE'},
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Username"
          component={UsernameScreen}
          options={{title: 'Enter Username'}}
        />
        <Stack.Screen
          name="RoomList"
          component={RoomList}
          options={{title: 'Available Rooms'}}
        />
        <Stack.Screen
          name="CreateRoom"
          component={CreateRoomScreen}
          options={{title: 'Create a Chat Room', headerBackTitle: 'Back'}}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{title: 'Chat Room', headerBackTitle: 'Back'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
