import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { SHOWS } from '../shared/shows';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        shows: state.shows
    };
};

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
                <Tile
                    title={item.title}
                    caption={`${item.subhead}  --  ${item.address}`}
                    featured
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        return (
            <FlatList
                data={this.props.shows.shows}
                renderItem={renderShowItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Shows);