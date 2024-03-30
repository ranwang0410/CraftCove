from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    db.session.add(Review(user_id=2, product_id=1, rating=1,comment='The drawing exceeded my expectations. The artist not only captured the photographic image, but he beautifully captured the emotions of the mother and baby in the photograph. He was quick to make the few adjustments I requested and the drawing turned out exactly as I wanted!'))
    db.session.add(Review(user_id=3, product_id=1, rating=2,comment='Great gift and very helpful and talented artist'))
    db.session.add(Review(user_id=2, product_id=2, rating=3,comment='Amazing artist, and outstanding illustrations! Brought my husband to tears.'))
    db.session.add(Review(user_id=3, product_id=2, rating=4,comment='Blown away with how great this is!!! We tried other places and they were not nearly as perfect. Love this!'))
    db.session.add(Review(user_id=2, product_id=3, rating=5,comment='Prompt reply from Chris on any queries I may have asked'))
    db.session.add(Review(user_id=3, product_id=3, rating=1,comment='Love the picture so much! Great service and great quality'))
    db.session.add(Review(user_id=2, product_id=4, rating=2,comment='Cute necklace! Made for a nice gift!'))
    db.session.add(Review(user_id=3, product_id=4, rating=3,comment='exactly as pictured! beautiful and danty'))
    db.session.add(Review(user_id=2, product_id=5, rating=4,comment='Super cute!! I had an issue with my first purchase and Maya was really responsive. I would definitely purchase again!'))
    db.session.add(Review(user_id=3, product_id=5, rating=5,comment='This was a perfect gift!'))
    db.session.add(Review(user_id=1, product_id=6, rating=1,comment='They are beautifully crafted and executed. A trail of compliments follow me every time I wear them, and I do, OFTEN. Laooooooove them and received quickly.'))
    db.session.add(Review(user_id=3, product_id=6, rating=2,comment='It has a high resolution so I was able to print it in high quality without a problem. It suited my study room better than I expected. I am very happy with this digital art. Thanks'))
    db.session.add(Review(user_id=1, product_id=7, rating=3,comment='Bought this for my staff, it was a hit! Everyone loves it and great quality.'))
    db.session.add(Review(user_id=3, product_id=7, rating=4,comment='Beautiful bag!! The color red is gorgeous and the size small is much bigger than I expected although is definitely the perfect size. Looking forward to having this bag last for years. The straps are reinforced which is great. I attached a picture of the bag in real life situation (close ups don help with actually viewing the product imo) and find it looks exactly like the picture provided by the seller. The straps have some creases, but that is expected to happen with a real leather product (it character!). Shipping took a while but hey what can you do.'))
    db.session.add(Review(user_id=1, product_id=8, rating=5,comment='Love it and will order again'))
    db.session.add(Review(user_id=3, product_id=8, rating=1,comment='Excellent high quality materials! Please see my review of their wallet!'))
    db.session.add(Review(user_id=1, product_id=9, rating=2,comment='This knife is such a gorgeous piece of craftsmanship. I purchased this knife for my father’s 64th birthday present. He loved it and immediately put the knife and sheath on his belt and has been wearing it all evening! I will be purchasing more of these beautiful knives down the road.'))
    db.session.add(Review(user_id=2, product_id=9, rating=3,comment='Beautiful knife my dad loved his birthday present'))
    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
