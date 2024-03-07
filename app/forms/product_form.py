from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField,URLField
from wtforms.validators import DataRequired, Length, NumberRange,ValidationError
from app.models import Product

def product_exists(form, field):

    if Product.query.filter(Product.product_name==field.data).first():
        raise ValidationError('This product name already exists.')

class ProductForm(FlaskForm):
    shop_id = IntegerField('Shop ID')
    product_name = StringField('Product Name', validators=[DataRequired(),product_exists, Length(max=225)])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    desc = StringField('description', validators=[Length(max=512, message="Length of description must be less than 512 characters")])
    image1 = URLField('image1', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image2 = URLField('image2', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image3 = URLField('image3', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image4 = URLField('image4', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image5 = URLField('image5', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image6 = URLField('image6', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image7 = URLField('image7', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image8 = URLField('image8', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    image9 = URLField('image9', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    categorie = StringField('Categorie')
