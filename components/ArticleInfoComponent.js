import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ARTICLES } from '../shared/articles';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        articles: state.articles
    };
};

function RenderArticle(props) {

    const {article} = props;

    if (article) {
        return (
            <Card
                featuredTitle={article.title}
                image={{uri: baseUrl + article.image}}>
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
        const article = this.props.articles.articles.filter(article => article.id === articleId)[0];
        return (
            <ScrollView>
                <RenderArticle 
                    article={article} 
                    interested={this.state.interested}
                    markInterested={() => this.markInterested()}
                />
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps)(ArticleInfo);