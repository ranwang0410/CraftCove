from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop,Product,db,Review,Cart
from app.forms import ProductForm,ShopForm,ReviewForm,CartForm
from helper import upload_file_to_s3, get_unique_filename


product_routes = Blueprint('product', __name__)

#get all products
@product_routes.route('/',methods=['GET'])
def get_all_product():
    products = Product.query.all()
    products_dict = [product.to_dict() for product in products]
    return {'Products': products_dict}


#create a product for specify shopId
@product_routes.route('/newproduct',methods=['POST'])
# @login_required
def create_product():
    # data = request.json
    form = ProductForm()
    shop_id = form.data['shop_id']

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        shop = Shop.query.filter_by(id = form.data['shop_id'],user_id=current_user.id).first()
        if not shop:
            return {"errors": {"message": "Product couldn't be found"}}, 404

        image_file = form.data['image1']
        # image_file = request.files.get('image1', None)
        if image_file:
            unique_filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file)

            if 'url' in upload:
                image_url = upload["url"]

                product = Product(
                shop_id = form.data['shop_id'],
                product_name=form.product_name.data,
                price=form.price.data,
                desc=form.desc.data,
                image1=image_url,
                categorie=form.categorie.data,
                )
                db.session.add(product)
                db.session.commit()
                new_product = product.to_dict()
                return {'Product':new_product}
            else:
                return jsonify({'errors':'Failed to upload image'}),400
        else:
            return jsonify({"errors": "Image file is required"}), 400
    else:
        return jsonify({'errors': form.errors}),401

#update a product
@product_routes.route('/update/<int:id>',methods=['PUT'])
@login_required
def update_productname(id):

    form =  ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('hi')
    product = Product.query.get(id)
    # print('hello',product.id)
    if not product or product.shop.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized'}), 401
    else:

        existing_product = Product.query.filter(Product.id != id, Product.product_name == form.data["product_name"]).first()
        # print('existing data===>',existing_product)
        if existing_product:
            return jsonify({'errors': 'Product name already existss.'}), 400

        if form.validate_on_submit():
            image_file = form.data['image1']
            if image_file:
                unique_filename = get_unique_filename(image_file.filename)
                upload = upload_file_to_s3(image_file)
                if 'url' in upload:
                    product.image1 = upload['url']
                else:
                    return jsonify({'errors':'Failed to upload image'}),400
            product.product_name = form.data["product_name"]
            product.price = form.data["price"]
            product.desc = form.data["desc"]
            product.categorie = form.data["categorie"]
            db.session.commit()
            return product.to_dict()
        return jsonify({'errors': form.errors}),401

#delete a product
@product_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_shop(id):
    product = Product.query.get(id)

    if not product:
        return {"errors": {"message": "product couldn't be found"}}, 404
    product_to_delete = product.to_dict()
    if product and product.shop.user_id == current_user.id:
        db.session.delete(product)
        db.session.commit()
        return {"message": "Successfully deleted"}
    return {'errors': {'message': 'Unauthorized'}}, 401


#get product by product id
@product_routes.route('/<int:product_id>')
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({'error': 'Product not found'}), 404


#post new review for specify productId
@login_required
@product_routes.route('/<int:product_id>/newreview',methods=['POST'])
def create_review(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    rating = data.get('rating')
    comment = data.get('comment')
    product = Product.query.get(product_id)
    print('product===>',product)
    if form.validate_on_submit():

        if not product:
            return {"errors": {"message": "Product couldn't be found"}}, 404
        user = current_user.to_dict()
        review = Review(
            user_id = user['id'],
            product_id = product.id,
            rating = form.data['rating'],
            comment = form.data['comment']
        )
        db.session.add(review)
        db.session.commit()
        new_review=review.to_dict()
        return {'Review':new_review}
    else:
        return jsonify({'errors': form.errors}), 400

#Add an Item to the Shopping Cart for current user

@product_routes.route('/<int:product_id>/addcart', methods=['POST'])
def add_to_cart(product_id):
    form =CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = request.get_json()
    print(data,'this is data ===>')
    quantity = data.get('quantity', 1)

    product = Product.query.get(product_id)
    user_id = current_user.id if current_user.is_authenticated else 1
    if form.validate_on_submit():
        try:
            if not product:
                return {"errors": {"message": "Product couldn't be found"}}, 404
            existing_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
            if existing_item:
                existing_item.quantity += int(quantity)
            else:
                new_item = Cart(user_id=user_id, product_id=product_id, quantity=int(quantity))
                db.session.add(new_item)
            db.session.commit()
            return jsonify({'message': 'Item added or updated in cart'}), 200
        except Exception as e:
            return jsonify({'error': 'Unable to process request', 'details': str(e)}), 500
