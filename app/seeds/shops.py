from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shops():

    db.session.add(Shop(user_id=1,shopname='ArtisticDrawingPlace'))
    db.session.add(Shop(user_id=1,shopname='MyMinimalistArtStore'))
    db.session.add(Shop(user_id=1,shopname='SerenityJewelryBliss'))
    db.session.add(Shop(user_id=2,shopname='MorphStudyo'))
    db.session.add(Shop(user_id=2,shopname='SanTanLeather'))
    db.session.add(Shop(user_id=2,shopname='LeatherMilano'))
    db.session.add(Shop(user_id=3,shopname='YoursPersonalized'))
    db.session.add(Shop(user_id=3,shopname='shop2_user3'))
    db.session.add(Shop(user_id=3,shopname='shop3_user3'))
    db.session.commit()

def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
