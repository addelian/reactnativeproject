import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { ARTICLES } from '../shared/articles';
import { SHOWS } from '../shared/shows';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        articles: state.articles,
        shows: state.shows
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.title}
                image={{uri: baseUrl + item.image}}>
                <Text style={{margin: 10, textAlign: 'center'}}>
                    {item.subhead}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES,
            shows: SHOWS
        };
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text style={{ 
                        paddingVertical: 10, 
                        fontSize: 30, 
                        textAlign: 'center' }}>Welcome!</Text>
                    <Text style={{ 
                        paddingBottom: 10, 
                        fontSize: 20, 
                        textAlign: 'center' }}>Thanks for stopping by.</Text>
                </View>
                <Text style={{ 
                    paddingTop: 25, 
                    paddingBottom: 5, 
                    fontSize: 25, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    textDecorationLine: 'underline' 
                    }}>Featured Article</Text>
                <RenderItem
                    item={this.props.articles.articles.filter(article => article.featured)[0]}
                    isLoading={this.props.articles.isLoading}
                    errMess={this.props.articles.errMess}
                />
                <Text style={{ 
                    paddingTop: 25, 
                    paddingBottom: 5, 
                    fontSize: 25, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    textDecorationLine: 'underline' 
                    }}>Next Show</Text>
                <RenderItem
                    item={this.props.shows.shows.filter(show => show.featured)[0]}
                    isLoading={this.props.shows.isLoading}
                    errMess={this.props.shows.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);