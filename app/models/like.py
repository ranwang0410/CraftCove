# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime
# from .user import User
# from .product import Product

# class Like(db.Model):
#     __tablename__ = 'likes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey(Product.id), nullable=False)

#     created_at = db.Column(db.DateTime, default=datetime.now)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

#     user = db.relationship('User', back_populates='like')
#     product = db.relationship('Product', back_populates='like')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'user': self.user.to_dict(),
#             'product_id': self.product_id,
#             'product': self.product.to_dict(),

#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#             }
