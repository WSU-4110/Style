from rest_framework.authentication import BaseAuthentication
from firebase_admin import auth
from django.contrib.auth.models import User

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return None

        try:
            decoded_token = auth.verify_id_token(token.split('Bearer ')[-1])
            user_email = decoded_token.get('email')

            if not user_email:
                return None

            user, created = User.objects.get_or_create(email=user_email, defaults={'username': user_email.split('@')[0]})
            return (user, None)
        except Exception as e:
            return None
