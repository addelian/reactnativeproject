import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { postInterested } from '../redux/ActionCreators';
import { SHOP } from '../shared/articles';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        shop: state.shop,
        interested: state.interested
    };
};

const mapDispatchToProps = {
    postInterested: articleId => (postInterested(articleId))
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

    markInterested(articleId) {
        this.props.postInterested(articleId);
    }

    static navigationOptions = {
        title: 'Article Information'
    };

    render() {
        const articleId = this.props.navigation.getParam('articleId');
        const article = this.props.articles.articles.filter(article => article.id === articleId)[0];
        return (
            <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                <ScrollView>
                    <RenderArticle 
                        article={article} 
                        interested={this.props.interested.includes(articleId)}
                        markInterested={() => this.markInterested(articleId)}
                    />
                </ScrollView>
            </Animatable.View>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleInfo);