import React, { Component } from 'react';
import Home from './HomeComponent';
import Newsfeed from './NewsfeedComponent';
import Contact from './ContactComponent';
import ArticleInfo from './ArticleInfoComponent';
import Shows from './ShowsComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator,
    DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchArticles, fetchShows } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchArticles,
    fetchShows
};

const NewsfeedNavigator = createStackNavigator(
    {
        Newsfeed: {
            screen: Newsfeed,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
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
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#03719C'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ShowsNavigator = createStackNavigator(
    {
        Shows: { screen: Shows }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#03719C'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: <Icon
                name='music'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#03719C'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft: <Icon
                name='mobile'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Jake Genera Music</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Newsfeed: {
            screen: NewsfeedNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Shows: {
            screen: ShowsNavigator, 
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='music'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='mobile'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    },
    {
        contentOptions: {
            inactiveTintColor: 'white',
            activeBackgroundColor: '#343134'
        },
        drawerBackgroundColor: '#535857',
        contentComponent: CustomDrawerContentComponent
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchArticles();
        this.props.fetchShows();
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#535857',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 7.5,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: 'white',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps) (Main);