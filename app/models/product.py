from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User
from .shop import Shop

class Product(db.Model):
    # print('this is product model')
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'))
    product_name = db.Column(db.String(225), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    desc = db.Column(db.String(512))
    image1 = db.Column(db.String(255),nullable=False)
    image2 = db.Column(db.String(255))
    image3 = db.Column(db.String(255))
    image4 = db.Column(db.String(255))
    image5 = db.Column(db.String(255))
    image6 = db.Column(db.String(255))
    image7 = db.Column(db.String(255))
    image8 = db.Column(db.String(255))
    image9 = db.Column(db.String(255))


    categorie = db.Column(db.String(255),nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    shop = db.relationship('Shop', back_populates='products')
    cart = db.relationship('Cart', back_populates='product',cascade='all, delete-orphan')
    # like = db.relationship('Like', back_populates='product',cascade='all, delete-orphan')
    review = db.relationship('Review', back_populates='product',cascade='all, delete-orphan')
    # transaction_item = db.relationship('TransactionItem', back_populates='product',cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'shop_id': self.shop_id,
            'shop': self.shop.to_dict(),
            'product_name': self.product_name,
            'price': self.price,
            'desc': self.desc,
            'image1': self.image1,
            'image2': self.image2,
            'image2': self.image2,
            'image3': self.image3,
            'image4': self.image4,
            'image5': self.image5,
            'image6': self.image6,
            'image7': self.image7,
            'image8': self.image8,
            'image9': self.image9,
            'categorie': self.categorie,
            # 'review':self.review.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
            }
