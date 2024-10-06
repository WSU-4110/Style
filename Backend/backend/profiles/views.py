from django.shortcuts import render
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views import View

class PasswordResetRequestView(View):
    def post(self, request):
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'message': 'No user found with this email.'}, status=404)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        password_reset_link = f"http://localhost:3000/reset/{uid}/{token}/"

        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {password_reset_link}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
        )
        return JsonResponse({'message': 'Password reset email has been sent.'})

class PasswordResetConfirmView(View):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.POST.get('new_password')
            user.set_password(new_password)
            user.save()
            return JsonResponse({'message': 'Your password has been reset successfully.'})
        else:
            return JsonResponse({'message': 'Invalid password reset link.'}, status=400)


