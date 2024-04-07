from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
import string
import random

@api_view(['GET'])
def generate_password(request):
    length = int(request.GET.get('length', 8))
    include_uppercase = request.GET.get('uppercase') == 'true'
    include_lowercase = request.GET.get('lowercase') == 'true'
    include_numbers = request.GET.get('number') == 'true'
    include_special = request.GET.get('complex') == 'true'

    characters = ''
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_lowercase:
        characters += string.ascii_lowercase
    if include_numbers:
        characters += string.digits
    if include_special:
        characters += string.punctuation

    passwords = ["".join(random.choice(characters) for _ in range(length)) for _ in range(4)]

    return JsonResponse({'passwords': passwords})