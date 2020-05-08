import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Newsfeed from './NewsfeedComponent';
import ArticleInfo from './ArticleInfoComponent';
import { ARTICLES } from '../shared/articles';

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
)

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0: Expo.Constants.statusBarHeight }}>
                <NewsfeedNavigator />
            </View>
        );
    }
}

export default Main;