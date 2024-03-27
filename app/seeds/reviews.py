from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    db.session.add(Review(user_id=1, product_id=1, rating=3,comment='review1'))
    db.session.add(Review(user_id=1, product_id=2, rating=3,comment='review2'))
    db.session.add(Review(user_id=1, product_id=3, rating=3,comment='review3'))
    db.session.add(Review(user_id=2, product_id=1, rating=3,comment='review4'))
    db.session.add(Review(user_id=2, product_id=2, rating=3,comment='review5'))
    db.session.add(Review(user_id=2, product_id=3, rating=3,comment='review6'))
    db.session.add(Review(user_id=3, product_id=1, rating=3,comment='review7'))
    db.session.add(Review(user_id=3, product_id=2, rating=3,comment='review8'))
    db.session.add(Review(user_id=3, product_id=3, rating=3,comment='review9'))
    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
