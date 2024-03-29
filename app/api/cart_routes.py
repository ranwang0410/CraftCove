from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop,db,Product,Cart
from app.forms import CartForm

cart_routes = Blueprint('carts', __name__)

#Get All Items in the Shopping Cart
@cart_routes.route('/', methods=['GET'])

def get_cart_items():
    carts = Cart.query.all()
    carts_list = [cart.to_dict() for cart in carts]
    return {'Cart':carts_list}

@cart_routes.route('/current', methods=['GET'])
@login_required
def get_cart_by_user():
    print('current user====>',current_user.id)
    user_carts = Cart.query.filter_by(user_id=current_user.id).all()
    user_carts_list = [cart.to_dict() for cart in user_carts]
    return jsonify(user_carts_list)


# Update Quantity of an Item in the Shopping Cart
@cart_routes.route('/update/<int:item_id>', methods=['PUT'])
# @login_required
def update_item_quantity(item_id):
    data = request.get_json()
    new_quantity = data.get('quantity')
    cart_item = Cart.query.filter_by(id=item_id).first()
    if not cart_item:
        return jsonify({'error': 'Cart item not found'}), 404
    if new_quantity <= 0:
        return jsonify({'error': 'Quantity must be greater than 0'}), 400
    if cart_item and new_quantity > 0:
        print('here===')
        cart_item.quantity = new_quantity

        db.session.commit()
        return jsonify(cart_item.to_dict()), 200
    else:
        print('elese')
        return jsonify({'error': 'Invalid request'}), 400

# Delete an Item from the Shopping Cart
@cart_routes.route('/delete/<int:item_id>', methods=['DELETE'])
# @login_required
def delete_item_from_cart(item_id):
    cart_item = Cart.query.filter_by(id=item_id).first()
    print(cart_item.id)
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Item removed from cart'}), 200
    else:
        return jsonify({'error': 'Item not found'}), 404
