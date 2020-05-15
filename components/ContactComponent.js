import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Me'
    };

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                    <Card 
                        title="I'd love to hear from you!"
                        wrapperStyle={{margin: 20}}
                    >
                        <Text>414 Redwood Point</Text>
                        <Text>Isle of Skye, Scotland</Text>
                        <Text style={{marginBottom:10}}>United Kingdom</Text>
                        <Text>Phone: +44 3430 164251</Text>
                        <Text>Email: jgenera@jgmusic.co.uk</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;