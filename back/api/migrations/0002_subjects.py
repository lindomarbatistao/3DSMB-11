# Generated by Django 5.1.5 on 2025-03-20 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod', models.CharField(max_length=255)),
                ('sub', models.CharField(max_length=255)),
                ('quant', models.IntegerField()),
            ],
        ),
    ]
