import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import {Provider} from 'react-redux';
import {store} from './redux/store';

import Home from './screen/Home';
import Profile from './screen/profile/Profile';
import Register from './screen/Register';
import Login from './screen/Login';

import Reward from './screen/reward/Reward';
import RewardCreate from './screen/reward/Create';
import RewardEdit from './screen/reward/Edit';
import RewardDetail from './screen/reward/Detail';

import Promotion from './screen/promotion/Promotion';
import PromoCreate from './screen/promotion/Create';
import PromoEdit from './screen/promotion/Edit';
import PromoDetail from './screen/promotion/Detail';
import RewardOrder from './screen/reward/RewardOrder';
import RewardHistory from './screen/reward/History';

import PointsManage from './screen/user/PointsManage';
import Users from './screen/user/Users';
import RoleManage from './screen/user/RoleManage';
import UserRecord from './screen/user/Record';
import ProfileUpdate from './screen/profile/ProfileUpdate';
import ChangePassword from './screen/profile/ChangePassword';
import Employee from './screen/user/Employee';

import AnalyzePoints from './screen/analyze/Points';
import AnalyzeRecord from './screen/analyze/Record';

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#0097A7',
        headerStyle: {backgroundColor: '#00BCD4'},
        headerTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Promotion"
        component={Promotion}
        options={{
          tabBarLabel: 'Promotion',
          tabBarIcon: ({color, size}) => (
            <Feather name="package" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarLabel: 'Reward',
          tabBarIcon: ({color, size}) => (
            <Feather name="gift" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0097A7" />
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#00BCD4'},
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Promotion" component={Promotion} />
          <Stack.Screen name="PromotionCreate" component={PromoCreate} />
          <Stack.Screen name="PromotionEdit" component={PromoEdit} />
          <Stack.Screen name="PromotionDetail" component={PromoDetail} />

          <Stack.Screen name="Reward" component={Reward} />
          <Stack.Screen name="RewardCreate" component={RewardCreate} />
          <Stack.Screen name="RewardEdit" component={RewardEdit} />
          <Stack.Screen name="RewardDetail" component={RewardDetail} />
          <Stack.Screen name="RewardOrder" component={RewardOrder} />
          <Stack.Screen name="RewardHistory" component={RewardHistory} />

          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="StaffList" component={Employee} />
          <Stack.Screen name="RoleManage" component={RoleManage} />
          <Stack.Screen name="PointsManage" component={PointsManage} />
          <Stack.Screen name="UserRecord" component={UserRecord} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />

          <Stack.Screen name="AnalyzePoints" component={AnalyzePoints} />
          <Stack.Screen name="AnalyzeRecord" component={AnalyzeRecord} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
