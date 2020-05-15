import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        articles: state.articles,
        interested: state.interested
    };
};

class Interested extends Component {

    static navigationOptions = {
        title: 'Saved Articles'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderInterestedItem = ({item}) => {
            return (
                <ListItem
                    title={item.title}
                    subtitle={item.subhead}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('ArticleInfo', {articleId: item.id})}
                />
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

export default connect(mapStateToProps)(Interested);