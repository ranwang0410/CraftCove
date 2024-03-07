from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length,ValidationError
from app.models import Shop

def shop_exists(form, field):

    if Shop.query.filter(Shop.shopname==field.data).first():
        raise ValidationError('This shop name already exists.')
class ShopForm(FlaskForm):
    shopname = StringField('Shop Name', validators=[DataRequired(), shop_exists])
