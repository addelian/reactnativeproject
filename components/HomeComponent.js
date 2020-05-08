import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { ARTICLES } from '../shared/articles';
import { SHOWS } from '../shared/shows';

function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.title}
                image={require('./images/hazy.jpg')}>
                <Text style={{margin: 10}}>
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
                item={this.state.articles.filter(article => article.featured)[0]} />
                <Text style={{ 
                    paddingTop: 25, 
                    paddingBottom: 5, 
                    fontSize: 25, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    textDecorationLine: 'underline' 
                    }}>Next Show</Text>
                <RenderItem
                item={this.state.shows.filter(show => show.featured)[0]} />
            </ScrollView>
        );
    }
}

export default Home;