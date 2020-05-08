import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ARTICLES } from '../shared/articles';

class Newsfeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES,
        };
    }

    static navigationOptions = {
        title: 'News'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderArticleItem = ({item}) => {
            return (
                <ListItem
                    title={item.title}
                    subtitle={item.subhead}
                    onPress={() => navigate('ArticleInfo', { articleId: item.id })}
                    leftAvatar={{ source: require('./images/hazy.jpg')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.articles}
                renderItem={renderArticleItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Newsfeed;