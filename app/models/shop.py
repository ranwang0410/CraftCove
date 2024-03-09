from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User


class Shop(db.Model):
    # print('this is shop model')
    __tablename__ = 'shops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    shopname = db.Column(db.String(40), nullable=False, unique=True)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='shops')
    products = db.relationship('Product', back_populates='shop', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,

            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'shopname': self.shopname,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            }
