import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Newsfeed(props) {

    const renderArticle = ({item}) => {
        return (
            <ListItem
                title={item.title}
                subtitle={item.subhead}
                leftAvatar={{ source: require('./images/hazy.jpg')}}
            />
        );
    };

    return (
        <FlatList
            data={props.articles}
            renderItem={renderArticle}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Newsfeed;