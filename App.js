import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';

import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import AddRentalPlaceScreen from './screens/AddRentalPlaceScreen';
import AllRentalPlacesScreen from './screens/AllRentalPlacesScreen';
import RentalPlacesContextProvider from './store/rental-places-context';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileScreen from './screens/ProfileScreen'
import RentalPlaceDetailsScreen from './screens/RentalPlaceDetailsScreen'

//import Map from './screens/Map';
//import { init } from './util/database';
//import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      sceneContainerStyle= {{ backgroundColor: Colors.primary800 }}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary700 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: Colors.primary700 },
        tabBarActiveTintColor: 'white',
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={authCtx.logout}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={AllRentalPlacesScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Add"
        component={AddRentalPlaceScreen}
        options={{
          title: 'Your Rental Place',
          tabBarLabel: 'Add Rental Place',
          tabBarIconStyle: {

          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const AuthStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary700 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary800 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllRentalPlacesScreen}
        options={({ navigation }) => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="log-in"
              color={tintColor}
              size={24}
              onPress={() => navigation.navigate('Login')}
            />
          ),
        })}
      />
      <Stack.Screen name="RentalPlaceDetails" component={RentalPlaceDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary700 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary800 },
      }}
    >
      <Stack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RentalPlaceDetails" component={RentalPlaceDetailsScreen} />
      {/* <Stack.Screen
        name="AllPlaces"
        component={AllRentalPlacesScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <RentalPlacesContextProvider>
          <Navigation />
        </RentalPlacesContextProvider>
      </AuthContextProvider>
    </>
  );
}
