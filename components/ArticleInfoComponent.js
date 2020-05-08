import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ARTICLES } from '../shared/articles';

function RenderArticle({article}) {

    if (article) {
        return (
            <Card
                featuredTitle={article.title}
                image={require('./images/hazy.jpg')}>
                <Text style={{margin: 10}}>
                    {article.text}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class ArticleInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES
        };
    }

    static navigationOptions = {
        title: 'Article Information'
    };

    render() {
        const articleId = this.props.navigation.getParam('articleId');
        const article = this.state.articles.filter(article => article.id === articleId)[0];
        return <RenderArticle article={article} />;
    }
}


export default ArticleInfo;