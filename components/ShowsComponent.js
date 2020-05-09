import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SHOWS } from '../shared/shows';

class Shows extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: SHOWS
        };
    }

    static navigationOptions = {
        title: 'Shows'
    };

    render() {

        const renderShowItem = (props) => {

            const {item} = props;

            return (
                <ListItem
                    title={item.title}
                    subtitle={
                        <View>
                            <Text>{item.subhead}</Text>
                            <Text>{item.address}</Text>
                        </View>
                    }
                    leftAvatar={{ source: require('./images/hazy.jpg')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.shows}
                renderItem={renderShowItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Shows;