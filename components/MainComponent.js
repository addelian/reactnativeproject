import React, { Component } from 'react';
import { View } from 'react-native';
import Newsfeed from './NewsfeedComponent';
import ArticleInfo from './ArticleInfoComponent';
import { ARTICLES } from '../shared/articles';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES,
            selectedArticle: null
        };
    }

    onArticleSelect(articleId) {
        this.setState({selectedArticle: articleId});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Newsfeed articles={this.state.articles} onPress={articleId => this.onArticleSelect(articleId)} />
                <ArticleInfo article={this.state.articles.filter(article => article.id === this.state.selectedArticle)[0]} />
            </View>
        );
    }
}

export default Main;