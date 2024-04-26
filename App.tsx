/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View, Text, TextInput,
  StyleSheet, Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  console.log('itemId: ' + itemId);

  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          console.log(navigation);
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 77,
            otherParam: 'anything you want here',
          })
        }
        }
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post content: {route.params?.post}</Text>
      <Button
        title="Go to Details2"
        onPress={() => {
          console.log(navigation);
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Detailsss')
        }
        }
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam, query } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Text>setParams: {JSON.stringify(query)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Details... again with push  (adds to stack)"
        onPress={() => {

          navigation.push('Details', { itemId: itemId + 1 })
          if (itemId > 90) {
            navigation.setParams({
              query: 'someText',
            });
            navigation.setParams({
              itemId: 'number replaced with text',
            });
          }
        }}
      />
      <Text>setParams example:{query} {JSON.stringify(query)} </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Homeee', { itemId: itemId + 2 })} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home with push (adds to stack)" onPress={() => navigation.push('Homeee')} />
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'pink' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Homeee',
            params: { post: postText },
            merge: true,
          });
        }}
      />
      <Button
        title="Update the title"
        onPress={() => {

          navigation.setOptions({ title: 'Updated!' })

        }
        }
      />
    </>
  );
}


function DetailsScreen2({ route, navigation }) {
  /* 2. Get the param */

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button title="Go to Home" onPress={() => navigation.navigate('Homeee')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home with push (adds to stack)" onPress={() => navigation.push('Homeee')} />
    </View>
  );
}

function LogoTitle() {
  return (
    <View><Text>Image could be here!!!</Text></View>
  );
}


const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: 'orange',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Homeee" component={HomeScreen} initialParams={{ itemId: 0 }}
          // options={{ title: 'Custom Header' }}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Detailsss" component={DetailsScreen2} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{
          title: 'Customized Post title',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: 'yellow',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }} />

      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({

});

export default App;
