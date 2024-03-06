from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():

    db.session.add(Product(shop_id=1,product_name='Draw my child and me, Family Line Drawing, Personalized Gifts, Family Portrait, Anniversary Gift, Line Art, Hand Drawing, draw my baby',price=17.5,desc='this is desc for product1',image1='https://i.etsystatic.com/39422869/r/il/68c9fe/4556135381/il_794xN.4556135381_iwbg.jpg',image2='https://v.etsystatic.com/video/upload/ar_1:1,c_fill,h_105,q_auto,w_105/lv_0_20221210113009_qbtpjm.jpg',image3='https://i.etsystatic.com/39422869/c/1220/969/93/401/il/d900f2/4479502377/il_75x75.4479502377_ogum.jpg',image4='https://i.etsystatic.com/39422869/r/il/c25fac/4541710980/il_75x75.4541710980_epjk.jpg',image5='https://i.etsystatic.com/39422869/r/il/efaef8/4479501635/il_75x75.4479501635_mhsb.jpg',image6='https://i.etsystatic.com/39422869/r/il/f7509e/4432145674/il_75x75.4432145674_88ov.jpg',image7='https://i.etsystatic.com/39422869/r/il/9d9345/4479501621/il_75x75.4479501621_9k2f.jpg',image8='https://i.etsystatic.com/39422869/r/il/f03115/4432145784/il_75x75.4432145784_loc1.jpg',image9='https://i.etsystatic.com/39422869/r/il/b5616d/4432145718/il_75x75.4432145718_sbdu.jpg', categorie='categorie1'))
    db.session.add(Product(shop_id=1,product_name='Custom Dog Portrait in Black and White Pencil Drawing, Hand Drawn Illustration, Dog Sketches From Photo, Personalized Dog Gift, Draw His Dog',price=17.5,desc='this is desc for product2',image1='https://i.etsystatic.com/39422869/r/il/fe6a60/4435238684/il_75x75.4435238684_1gih.jpg',image2='https://v.etsystatic.com/video/upload/ar_1:1,c_fill,h_105,q_auto,w_105/lv_0_20221210112921_jwyzvh.jpg',image3='https://i.etsystatic.com/39422869/r/il/155890/4482590977/il_75x75.4482590977_tmgv.jpg',image4='https://i.etsystatic.com/39422869/r/il/fcc6e1/4435241068/il_75x75.4435241068_n6nu.jpg',image5='https://i.etsystatic.com/39422869/r/il/c7fa6f/4435240988/il_75x75.4435240988_d7l0.jpg',image6='https://i.etsystatic.com/39422869/r/il/c072e4/4548686724/il_75x75.4548686724_oi6i.jpg',image7='https://i.etsystatic.com/39422869/r/il/545ed7/4548687078/il_75x75.4548687078_dtbr.jpg',image8='https://i.etsystatic.com/39422869/r/il/4485e0/4531480514/il_75x75.4531480514_dyy7.jpg',image9='https://i.etsystatic.com/39422869/r/il/876257/4531480012/il_75x75.4531480012_h2rt.jpg', categorie='categorie1'))
    db.session.add(Product(shop_id=1,product_name='Custom Wedding Portrait Illustration from Photo, Personalized Anniversary Portrait Gift, Unique Couple and Family Line Art,',price=6.5,desc='this is desc for product3',image1='https://i.etsystatic.com/39422869/c/1991/1584/16/135/il/491cb5/4836391276/il_75x75.4836391276_ojuz.jpg',image2='https://v.etsystatic.com/video/upload/ar_1:1,c_fill,h_105,q_auto,w_105/tek_cizgi_ns4x71.jpg',image3='https://i.etsystatic.com/39422869/r/il/784f35/4673898580/il_75x75.4673898580_ksji.jpg',image4='https://i.etsystatic.com/39422869/r/il/50b5fb/4420541664/il_75x75.4420541664_n383.jpg',image5='https://i.etsystatic.com/39422869/r/il/8ae01a/4555946150/il_75x75.4555946150_jkbl.jpg',image6='https://i.etsystatic.com/39422869/r/il/79ef7d/4578911862/il_75x75.4578911862_dgn9.jpg',image7='https://i.etsystatic.com/39422869/r/il/b19312/4650868706/il_75x75.4650868706_24yd.jpg',image8='https://i.etsystatic.com/39422869/r/il/77a9d3/4511112490/il_75x75.4511112490_l1xp.jpg',image9='https://i.etsystatic.com/39422869/r/il/24493d/4673892274/il_75x75.4673892274_dxcm.jpg', categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='Pearl Choker, Dainty Choker Necklace, Teenage Girl Jewelry, Gifts for Young Women, Trending Summer',price=62.54,desc='this is desc for product4',image1='https://i.etsystatic.com/15227780/c/1500/1191/0/642/il/ca6888/5732171987/il_75x75.5732171987_5naz.jpg',image2='https://v.etsystatic.com/video/upload/ar_1:1,c_fill,h_105,q_auto,w_105/Video_bez_nosaukuma_izveidots_ar_Clipchamp_zmw3rp.jpg',image3='https://i.etsystatic.com/15227780/c/1071/850/250/3/il/528420/5732074689/il_75x75.5732074689_di6l.jpg',image4='https://i.etsystatic.com/15227780/r/il/da4639/5732065771/il_75x75.5732065771_1u34.jpg',image5='https://i.etsystatic.com/15227780/r/il/e5a1d6/5684125202/il_75x75.5684125202_cwty.jpg',image6='https://i.etsystatic.com/15227780/r/il/af842b/5732171491/il_75x75.5732171491_89ut.jpg',image7='https://i.etsystatic.com/15227780/r/il/a7754b/5732171489/il_75x75.5732171489_83hw.jpg',image8='https://i.etsystatic.com/15227780/r/il/dd4bb8/5732065765/il_75x75.5732065765_6wix.jpg',image9='https://i.etsystatic.com/15227780/r/il/20f6da/5732065769/il_75x75.5732065769_ldh2.jpg', categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='Designer Brooch with Wood Leaf, Crystal Brooch with Maple Leaf, Hand Made Jewelry, Unusual Gift for her',price=151.18,desc='this is desc for product5',image1='https://i.etsystatic.com/15227780/c/1500/1191/0/142/il/8eac1a/5684662355/il_75x75.5684662355_5ntu.jpg',image2='https://i.etsystatic.com/15227780/r/il/3344f8/5684660903/il_75x75.5684660903_qm0j.jpg',image3='https://i.etsystatic.com/15227780/r/il/a1945c/5636599048/il_75x75.5636599048_1bok.jpg',categorie='categorie1'))
    db.session.add(Product(shop_id=2,product_name='Mother Day Gift from Daughter as Mother Child Necklace Custom Family Necklace for Sentimental Gifts',price=84.97,desc='this is desc for product6',image1='https://i.etsystatic.com/15227780/c/1181/938/494/444/il/63a978/4761855808/il_75x75.4761855808_lq6e.jpg',image2='https://v.etsystatic.com/video/upload/ar_1:1,c_fill,h_105,q_auto,w_105/YouCut_20221212_202958576_undo9i.jpg',image3='https://i.etsystatic.com/15227780/c/998/793/597/729/il/682448/4810114349/il_75x75.4810114349_lkj5.jpg',image4='https://i.etsystatic.com/15227780/c/1584/1259/0/196/il/1fccaf/4761853746/il_75x75.4761853746_riig.jpg',image5='https://i.etsystatic.com/15227780/c/2000/1590/128/1034/il/bd71a6/4589600140/il_75x75.4589600140_hcz1.jpg',image6='https://i.etsystatic.com/15227780/r/il/0a390b/4575570223/il_75x75.4575570223_iss9.jpg',image7='https://i.etsystatic.com/15227780/r/il/22e777/4575570317/il_75x75.4575570317_12om.jpg',image8='https://i.etsystatic.com/15227780/r/il/ddc51e/4528184868/il_75x75.4528184868_e9v3.jpg',image9='https://i.etsystatic.com/15227780/r/il/2ac457/4575570549/il_75x75.4575570549_mqwx.jpg',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='Leather Tote Bag Christmas SALE, Leather Anniversary Gift for Women, Personalized Leather Laptop Work Student Bag, Tote with Pocket',price=72.24,desc='this is desc for product7',image1='https://i.etsystatic.com/25736608/c/2000/1586/0/413/il/d497d8/3548615759/il_75x75.3548615759_5q3s.jpg',image2='https://i.etsystatic.com/25736608/r/il/3bc94f/2892581033/il_75x75.2892581033_8ibk.jpg',image3='https://i.etsystatic.com/25736608/c/1920/1532/0/667/il/7ba129/2844952018/il_75x75.2844952018_qz6c.jpg',image4='https://i.etsystatic.com/25736608/r/il/c11a20/2892587805/il_75x75.2892587805_gy10.jpg',image5='https://i.etsystatic.com/25736608/c/1999/1596/0/403/il/6a8ec0/2844949624/il_75x75.2844949624_e2so.jpg',image6='https://i.etsystatic.com/25736608/r/il/11c5d3/2864819024/il_75x75.2864819024_fh6c.jpg',image7='https://i.etsystatic.com/25736608/r/il/eea7f8/2892580901/il_75x75.2892580901_trf5.jpg',image8='https://i.etsystatic.com/25736608/r/il/d84f88/2912539963/il_75x75.2912539963_1qh2.jpg',image9='https://i.etsystatic.com/25736608/r/il/a22586/2912529811/il_75x75.2912529811_oz6x.jpg',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='Personalized Leather Keyfob, Leather Keychain, Gift for Dad, Groomsmen Gift, Trigger Snap',price=7.26,desc='this is desc for product8',image1='https://i.etsystatic.com/25736608/r/il/7de7f6/2821256622/il_75x75.2821256622_ejdw.jpg',image2='https://i.etsystatic.com/25736608/r/il/5a00a8/2852983110/il_75x75.2852983110_l0zg.jpg',image3='https://i.etsystatic.com/25736608/r/il/457b98/2821173638/il_75x75.2821173638_garh.jpg',image4='https://i.etsystatic.com/25736608/r/il/7ae617/2821174436/il_75x75.2821174436_gct8.jpg',image5='https://i.etsystatic.com/25736608/r/il/3959c4/2868823811/il_75x75.2868823811_kho4.jpg',image6='https://i.etsystatic.com/25736608/r/il/de8e78/2821174600/il_75x75.2821174600_o97v.jpg',image7='https://i.etsystatic.com/25736608/r/il/bd8c11/2821218962/il_75x75.2821218962_pobo.jpg',image8='https://i.etsystatic.com/25736608/r/il/b603f9/2868839771/il_75x75.2868839771_dp3s.jpg',image9='https://i.etsystatic.com/25736608/r/il/4b9f80/2821181322/il_75x75.2821181322_feh8.jpg',categorie='categorie1'))
    db.session.add(Product(shop_id=3,product_name='Mens Bifold Leather Wallet, Personalized Classic Bifold Wallet, Slim Leather Wallet, Handmade wallet, Minimalist Wallet, Gift For Him',price=36.5,desc='this is desc for product9',image1='https://i.etsystatic.com/25736608/r/il/b6de50/2868648033/il_75x75.2868648033_41js.jpg',image2='https://i.etsystatic.com/25736608/c/2830/2249/0/0/il/cca4f9/2868646515/il_75x75.2868646515_eib6.jpg',image3='https://i.etsystatic.com/25736608/r/il/f30223/2820982998/il_75x75.2820982998_9sgr.jpg',image4='https://i.etsystatic.com/25736608/r/il/e94d53/2864193855/il_75x75.2864193855_7u97.jpg',image5='https://i.etsystatic.com/25736608/r/il/76f5bf/2820983454/il_75x75.2820983454_n35k.jpg',image6='https://i.etsystatic.com/25736608/r/il/7257e3/2868643861/il_75x75.2868643861_4xtn.jpg',image7='https://i.etsystatic.com/25736608/r/il/2d441d/2820989148/il_75x75.2820989148_ixlo.jpg',image8='https://i.etsystatic.com/25736608/r/il/c6eee0/2820984594/il_75x75.2820984594_ppqh.jpg',image9='https://i.etsystatic.com/25736608/r/il/15fb42/2868646967/il_75x75.2868646967_djag.jpg', categorie='categorie1'))
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
