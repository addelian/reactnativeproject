import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
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
                    onPress: () => this.props.deleteInterested(item.id)
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
                <View>
                    <Text>{this.props.articles.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.articles.articles.filter(
                    article => this.props.interested.includes(article.id)
                )}
                renderItem={renderInterestedItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interested);