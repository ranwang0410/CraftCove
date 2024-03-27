from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    # print('this is user model')
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255))
    icon = db.Column(db.String(255))
    gender = db.Column(db.String(50))
    city = db.Column(db.String(255))
    birthday = db.Column(db.DateTime)
    favorite_materials = db.Column(db.String(255))
    shipping_address = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    shops = db.relationship('Shop', back_populates='user',cascade='all, delete-orphan')
    # carts = db.relationship('Cart', back_populates='user',cascade='all, delete-orphan')
    # likes = db.relationship('Like', back_populates='user',cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user',cascade='all, delete-orphan')
    # transactions = db.relationship('Transaction', back_populates='user',cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'icon': self.icon,
            'gender': self.gender,
            'city': self.city,
            'birthday': self.birthday,
            'favorite_materials':self.favorite_materials,
            'shipping_address':self.shipping_address,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
