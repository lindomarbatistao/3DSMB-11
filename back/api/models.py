from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=10)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    ocup = models.CharField(max_length=255)
    cel = models.CharField(max_length=255)
