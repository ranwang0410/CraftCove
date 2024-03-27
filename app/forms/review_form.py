from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Review

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID')
    product_id = IntegerField('Product ID')
    rating = IntegerField('Rating',validators=[DataRequired()])
    comment = StringField('Comment',validators=[DataRequired()])
