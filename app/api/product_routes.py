from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop,Product,db
from app.forms import ProductForm,ShopForm
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
# @product_routes.route('/newproduct',methods=['POST'])
# @login_required
# def create_product():
#     data = request.json
#     shop_id = data['shop_id']
#     form = ProductForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():

#         shop = Shop.query.filter_by(id = form.data['shop_id'],user_id=current_user.id).first()
#         if not shop:
#             return {"errors": {"message": "Product couldn't be found"}}, 404

#         product = Product(
#             shop_id = shop_id,
#             product_name=form.product_name.data,
#             price=form.price.data,
#             desc=form.desc.data,
#             image1=form.image1.data,
#             image2=form.image2.data if form.image2.data else None,
#             image3=form.image3.data if form.image3.data else None,
#             image4=form.image4.data if form.image4.data else None,
#             image5=form.image5.data if form.image5.data else None,
#             image6=form.image6.data if form.image6.data else None,
#             image7=form.image7.data if form.image7.data else None,
#             image8=form.image8.data if form.image8.data else None,
#             image9=form.image9.data if form.image9.data else None,
#             categorie=form.categorie.data,
#         )
#         db.session.add(product)
#         db.session.commit()
#         new_product = product.to_dict()
#         return {'Product':new_product}
#     else:
#         return jsonify({'errors': form.errors}),401

#update a product
@product_routes.route('/update/<int:id>',methods=['PUT'])
@login_required
def update_productname(id):
    form =  ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get(id)

    if not product and product.shop.user_id == current_user.id:
        return redirect('api/auth/unauthorized')
    else:
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

# @product_routes.route('/update/<int:id>',methods=['PUT'])
# @login_required
# def update_productname(id):
#     # print(f"Update request received for product ID: {id}")
#     form =  ProductForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     product = Product.query.get(id)

#     if product and product.shop.user_id == current_user.id:
#         if form.validate_on_submit():
#             product.product_name = form.data["product_name"]
#             product.price = form.data["price"]
#             product.desc = form.data["desc"]
#             product.image1 = form.data["image1"]
#             product.image2 = form.data["image2"]
#             product.categorie = form.data["categorie"]

#             db.session.commit()
#             return product.to_dict()
#         return jsonify({'errors': form.errors}),401
#     return redirect('api/auth/unauthorized')


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


