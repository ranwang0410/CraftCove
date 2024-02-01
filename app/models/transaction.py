# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime
# from .user import User

# class Transaction(db.Model):
#     __tablename__ = 'transactions'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
#     total = db.Column(db.Float, nullable=False)
#     status = db.Column(db.String(40), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

#     user = db.relationship('User', back_populates='transaction')
#     transaction_item = db.relationship('TransactionItem', back_populates='transaction',cascade='all, delete-orphan')
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'user': self.user.to_dict(),
#             'total': self.total,
#             'status': self.status,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#             }
