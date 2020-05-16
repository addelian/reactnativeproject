import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteCart } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        shop: state.shop,
        cart: state.cart
    };
};

const mapDispatchToProps = {
    deleteCart: shopId => (deleteCart(shopId))
};

// function CartTotal(props) {
//     const {shop} = props;
//     const reducer = (total, c) => total + c;
//     return(
//         <Card>
//             <Text>Total:{shop.reduce(reducer)}</Text>
//         </Card>
//     );
// }
// Can I make this work??

class Cart extends Component {

    static navigationOptions = {
        title: 'Cart'
    }

    render() {   
        const { navigate } = this.props.navigation;
        const renderCartItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Item?',
                            'Are you sure you wish to remove "' + item.name + '" from your cart?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteCart(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        title={item.name}
                        subtitle={`${item.color}\n${item.price}`}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        onPress={() => {
                            Alert.alert(
                                'Leave Page?',
                                'Are you sure you wish to navigate away from the cart?',
                                [
                                    {
                                        text: 'No',
                                        onPress: () => console.log('Remained at Cart'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Yes',
                                        onPress: () => navigate('ShopInfo', {shopId: item.id})
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                    />
                </Swipeout>
            );
        };

        if (this.props.shop.isLoading) {
            return <Loading />;
        }
        if (this.props.shop.errMess) {
            return (
                <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                    <View>
                        <Text>{this.props.shop.errMess}</Text>
                    </View>
                </Animatable.View>
            );
        }
        return (
            <Animatable.View animation='fadeIn' duration={1500} delay={1000}>
                <FlatList
                    data={this.props.shop.shop.filter(
                        shop => this.props.cart.includes(shop.id)
                    )}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id.toString()}
                />
                {/* <CartTotal
                    shop={this.props.shop.shop.filter(
                        shop => this.props.cart.includes(shop.id)
                    )}
                /> */}
            </Animatable.View>
        );
    }
}

//See if I can figure out the CartTotal issue...

export default connect(mapStateToProps, mapDispatchToProps)(Cart);