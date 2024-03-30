# from app.models import db,Cart,environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_carts():
#     db.session.add(Cart(user_id=1, product_id= 1, quantity= 2))
#     db.session.add(Cart(user_id=1, product_id= 2, quantity= 1))
#     db.session.add(Cart(user_id=2, product_id= 1, quantity= 1))
#     db.session.add(Cart(user_id=2, product_id= 4, quantity= 1))
#     db.session.commit()
# def undo_carts():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM carts"))

#     db.session.commit()
