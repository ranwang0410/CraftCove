# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import Shop,db,Product,Cart


# cart_routes = Blueprint('carts', __name__)

# #Get All Items in the Shopping Cart
# @cart_routes.route('/', methods=['GET'])
# @login_required
# def get_cart_items():
#     cart_items = Cart.query.filter_by(user_id=current_user.id).all()
#     return jsonify([item.to_dict() for item in cart_items])

# #Add an Item to the Shopping Cart

# @cart_routes.route('/add', methods=['POST'])
# @login_required
# def add_to_cart():
#     data = request.get_json()
#     product_id = data.get('product_id')
#     quantity = data.get('quantity', 1)

#     existing_item = Cart.query.filter_by(user_id=current_user.id, product_id=product_id).first()

#     if existing_item:
#         existing_item.quantity += quantity
#     else:
#         new_item = Cart(user_id=current_user.id, product_id=product_id, quantity=quantity)
#         db.session.add(new_item)

#     db.session.commit()
#     return jsonify({'message': 'Item added to cart'}), 200

# #Update Quantity of an Item in the Shopping Cart
# @cart_routes.route('/update/<int:item_id>', methods=['POST'])
# @login_required
# def update_item_quantity(item_id):
#     data = request.get_json()
#     new_quantity = data.get('quantity')

#     cart_item = Cart.query.filter_by(id=item_id, user_id=current_user.id).first()

#     if cart_item and new_quantity > 0:
#         cart_item.quantity = new_quantity
#         db.session.commit()
#         return jsonify(cart_item.to_dict()), 200
#     else:
#         return jsonify({'error': 'Invalid request'}), 400

# # Delete an Item from the Shopping Cart
# @cart_routes.route('/delete/<int:item_id>', methods=['DELETE'])
# @login_required
# def delete_item_from_cart(item_id):
#     cart_item = Cart.query.filter_by(id=item_id, user_id=current_user.id).first()

#     if cart_item:
#         db.session.delete(cart_item)
#         db.session.commit()
#         return jsonify({'message': 'Item removed from cart'}), 200
#     else:
#         return jsonify({'error': 'Item not found'}), 404
