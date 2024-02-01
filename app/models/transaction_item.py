# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime
# from .product import Product
# from .transaction import Transaction

# class TransactionItem(db.Model):
#     __tablename__ = 'transaction_items'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     product_id = db.Column(db.Integer, db.ForeignKey(Product.id), nullable=False)
#     transaction_id = db.Column(db.Integer, db.ForeignKey(Transaction.id), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     price_per_item = db.Column(db.Float, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

#     product = db.relationship('Product', back_populates='transaction_item')
#     transaction = db.relationship('Transaction', back_populates='transaction_item')
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'product_id': self.product_id,
#             'product': self.product.to_dict(),
#             'transaction_id': self.transaction_id,
#             'transaction': self.transaction.to_dict(),
#             'quantity': self.quantity,
#             'price_per_item': self.price_per_item,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#             }
