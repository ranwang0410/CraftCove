from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
    shop_id = IntegerField('Shop ID')
    product_name = StringField('Product Name', validators=[DataRequired(), Length(max=40)])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    desc = TextAreaField('Description', validators=[Length(max=512)])
    image1 = StringField('Image 1', validators=[DataRequired()])
    image2 =StringField('Image 2')
    categorie = StringField('Category',validators=[DataRequired()])
