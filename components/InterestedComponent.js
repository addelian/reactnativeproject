import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteInterested } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        articles: state.articles,
        interested: state.interested
    };
};

const mapDispatchToProps = {
    deleteInterested: articleId => (deleteInterested(articleId))
};

class Interested extends Component {

    static navigationOptions = {
        title: 'Saved Articles'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderInterestedItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Saved Article?',
                            'Are you sure you wish to remove "' + item.title + '" from your list?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.title + 'Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteInterested(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        title={item.title}
                        subtitle={item.subhead}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        onPress={() => navigate('ArticleInfo', {articleId: item.id})}
                    />
                </Swipeout>
            );
        };

        if (this.props.articles.isLoading) {
            return <Loading />;
        }
        if (this.props.articles.errMess) {
            return (
                <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                    <View>
                        <Text>{this.props.articles.errMess}</Text>
                    </View>
                </Animatable.View>
            );
        }
        return (
            <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                <FlatList
                    data={this.props.articles.articles.filter(
                        article => this.props.interested.includes(article.id)
                    )}
                    renderItem={renderInterestedItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Animatable.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interested);