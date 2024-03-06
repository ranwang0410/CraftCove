from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class ShopForm(FlaskForm):
    shopname = StringField('Shop Name', validators=[DataRequired(), Length(min=1, max=40,message="Length of shop name must be between 0 and 40 characters")])

