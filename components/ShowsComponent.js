import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { SHOWS } from '../shared/shows';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

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

            if (props.isLoading) {
                return <Loading />;
            }
            if (props.errMess) {
                return (
                    <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                        <View>
                            <Text>{props.errMess}</Text>
                        </View>
                    </Animatable.View>
                );
            }
            if (item) {
                return (
                    <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                        <Tile
                            title={item.title}
                            caption={`${item.subhead}  --  ${item.address}`}
                            featured
                            imageSrc={{uri: baseUrl + item.image}}
                        />
                    </Animatable.View>
                );
            }
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