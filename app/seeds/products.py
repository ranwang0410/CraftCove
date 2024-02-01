from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():

    db.session.add(Product(shop_id=1,product_name='product1_shop1',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=1,product_name='product2_shop1',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=1,product_name='product3_shop1',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='product1_shop2',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='product2_shop2',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='product3_shop2',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='product1_shop3',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='product2_shop3',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='product3_shop3',price=1,desc='this is desc for product1',image1='img1',image2='img2',categorie='categorie1'))
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
