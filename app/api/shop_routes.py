from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop,db
from app.forms import ShopForm

shop_routes = Blueprint('shop', __name__)

#get all shops
@shop_routes.route('/',methods=['GET'])
@login_required
def get_all_shop():
    # current_app.logger.info('This is an info message')
    shops = Shop.query.all()
    shops_dict = [shop.to_dict() for shop in shops]
    # print('**************',shops_dict)
    return {'shops': shops_dict}

#get shop by userId
@shop_routes.route('/current',methods=['GET'])
@login_required
def get_shop_by_userId():

    user = current_user.to_dict()
    shops = Shop.query.all()
    filtered_shops = [shop.to_dict() for shop in shops if user['id'] == shop.user_id]
    return {'shops': filtered_shops}

#create a shop for specify userId
@shop_routes.route('/new',methods=['POST'])
@login_required
def create_shop():

    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.to_dict()
        shop = Shop(
            user_id = user['id'],
            shopname = form.data['shopname']
        )
        db.session.add(shop)
        db.session.commit()
        new_shop = shop.to_dict()
        return {'shop':new_shop}
    else:
        return form.errors,401

#update a shop name
@shop_routes.route('/update/<int:id>',methods=['PUT'])
@login_required
def update_shopname(id):
    shop = Shop.query.get(id)
    user = current_user.to_dict()
    if not shop:
        return {"errors": {"message": "Shop couldn't be found"}}, 404
    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if user['id'] == shop.user_id:
            data = request.json
            shop.shopname = data['shopname']
            db.session.commit()
            return shop.to_dict()
        else:
            return {'errors': {'message': 'Unauthorized'}}, 401
    return form.errors, 401

#delete a shop
@shop_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_shop(id):
    shop = Shop.query.get(id)
    user = current_user.to_dict()
    if not shop:
        return {"errors": {"message": "Shop couldn't be found"}}, 404
    shop_to_delete = shop.to_dict()
    if user["id"] == shop_to_delete["user_id"]:
        db.session.delete(shop)
        db.session.commit()
        return {"message": "Successfully deleted"}

