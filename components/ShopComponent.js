import React, { Component } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { SHOP } from '../shared/shop';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        shop: state.shop
    };
};

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shop: SHOP,
        };
    }

    static navigationOptions = {
        title: 'Shop'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderShopItem = ({item}) => {
            return (
                <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                    <Card
                        title={`${item.name} - ${item.color}`}
                        featuredSubtitle={`$${item.price}`}
                        featuredSubtitleStyle={{marginTop:100}}
                        image={{uri: baseUrl + item.image}}
                    >
                        <Button
                            color="#03719C"
                            title="View" 
                            onPress={() => navigate('ShopInfo', { shopId: shop.id })}
                        />
                    </Card>
                </Animatable.View>
            );
        };

        if (this.props.shop.isLoading) {
            return <Loading />;
        }
        if (this.props.shop.errMess) {
            return (
                <View>
                    <Text>{this.props.shop.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.shop.shop}
                renderItem={renderShopItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Shop);