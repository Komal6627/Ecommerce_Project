# Generated by Django 5.0 on 2024-02-22 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_product__id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='_id',
            field=models.AutoField(default='', editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='_id',
            field=models.AutoField(default='', editable=False, primary_key=True, serialize=False),
        ),
    ]
