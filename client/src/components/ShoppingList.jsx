import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Button, Container} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';
import {getItems, deleteItem} from '../redux/actions/itemActions'
import PropTypes from 'prop-types';

class ShoppingList extends Component{
    state = {  } 

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render(){
        const {items} = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({name,_id})=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated?
                                        <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                    :''
                                    }
                                    
                                   &nbsp;&nbsp; {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


const mapStateToProps = (state)=>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{getItems, deleteItem})(ShoppingList);