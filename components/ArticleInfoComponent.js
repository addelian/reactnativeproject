import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { ARTICLES } from '../shared/articles';

function RenderArticle(props) {

    const {article} = props;

    if (article) {
        return (
            <Card
                featuredTitle={article.title}
                image={require('./images/hazy.jpg')}>
                <Text style={{margin: 10}}>
                    {article.text}
                </Text>
                <Icon
                    name={props.interested ? 'star' : 'star-o'}
                    type='font-awesome'
                    color='#fcd303'
                    raised
                    reverse
                    onPress={() => props.interested ?
                        console.log('Already set as interested') : props.markInterested()}
                />
            </Card>
        );
    }
    return <View />;
}

class ArticleInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES,
            interested: false
        };
    }

    markInterested() {
        this.setState({interested: true});
    }

    static navigationOptions = {
        title: 'Article Information'
    };

    render() {
        const articleId = this.props.navigation.getParam('articleId');
        const article = this.state.articles.filter(article => article.id === articleId)[0];
        return (
            <RenderArticle 
                article={article} 
                interested={this.state.interested}
                markInterested={() => this.markInterested()}
            />
        );
    }
}


export default ArticleInfo;