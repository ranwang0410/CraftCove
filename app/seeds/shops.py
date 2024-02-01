from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shops():

    db.session.add(Shop(user_id=1,shopname='shop1_user1'))
    db.session.add(Shop(user_id=1,shopname='shop2_user1'))
    db.session.add(Shop(user_id=1,shopname='shop3_user1'))
    db.session.add(Shop(user_id=2,shopname='shop1_user2'))
    db.session.add(Shop(user_id=2,shopname='shop2_user2'))
    db.session.add(Shop(user_id=2,shopname='shop3_user2'))
    db.session.add(Shop(user_id=3,shopname='shop1_user3'))
    db.session.add(Shop(user_id=3,shopname='shop2_user3'))
    db.session.add(Shop(user_id=3,shopname='shop3_user3'))
    db.session.commit()

def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
