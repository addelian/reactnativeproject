import React, { Component } from 'react';
import Home from './HomeComponent';
import Newsfeed from './NewsfeedComponent';
import ArticleInfo from './ArticleInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const NewsfeedNavigator = createStackNavigator(
    {
        Newsfeed: { screen: Newsfeed },
        ArticleInfo: { screen: ArticleInfo }
    },
    {
        initialRouteName: 'Newsfeed',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#03719C'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#03719C'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Newsfeed: { screen: NewsfeedNavigator }
    },
    {
        contentOptions: {
            inactiveTintColor: 'white',
            activeBackgroundColor: '#343134'
        },
        drawerBackgroundColor: '#535857'
    }
);

class Main extends Component {

    render() {
        return (
            <View style={{
                flex: 1, 
                paddingTop: Platform.OS === 'ios' ? 0: Expo.Constants.statusBarHeight
            }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;