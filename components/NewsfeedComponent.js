import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { ARTICLES } from '../shared/articles';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

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
                <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                    <Tile
                        title={item.title}
                        caption={item.subhead}
                        featured
                        onPress={() => navigate('ArticleInfo', { articleId: item.id })}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
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
                data={this.props.articles.articles}
                renderItem={renderArticleItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Newsfeed);