import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { ARTICLES } from '../shared/articles';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        articles: state.articles
    };
};

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
                <Tile
                    title={item.title}
                    caption={item.subhead}
                    featured
                    onPress={() => navigate('ArticleInfo', { articleId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        return (
            <FlatList
                data={this.props.articles.articles}
                renderItem={renderArticleItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Newsfeed);