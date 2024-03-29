from flask import Blueprint,jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db, Product
from app.forms import ReviewForm

review_routes = Blueprint('review',__name__)

#get all reviews
@review_routes.route('/',methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    reviews_dict = [review.to_dict() for review in reviews]
    return {'reviews':reviews_dict}


#get current user's review
@review_routes.route('/current',methods=['GET'])
@login_required
def get_reviews_for_current_user():
    reviews = current_user.reviews
    reviews_dict = [review.to_dict() for review in reviews]
    return {'reviews':reviews_dict}

#get product's reviews
@review_routes.route('/<int:product_Id>',methods=['GET'])

def get_reviews_for_product(product_Id):
    reviews = Review.query.filter(product_Id == Review.product_id).all()
    reviews_dict = [review.to_dict() for review in reviews]
    return {'reviews':reviews_dict}

#update a review
@review_routes.route('/update/<int:id>',methods=['PUT'])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)
    if not review:
        return jsonify({'errors':'Review not found'}),404
    if review.user_id != current_user.id:
        return jsonify({'errors':'Unauthorized to update this review'}),403

    if form.validate_on_submit():
        review.comment = form.data['comment']
        review.rating = form.data['rating']
        db.session.commit()
        return review.to_dict()
    else:
        return jsonify({'errors':form.errors}),400

#delete a review
@review_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({'message': "Review couldn't be found"}), 404
    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized to delete this review'}), 403
    if review and review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {"message": "Successfully deleted"}

