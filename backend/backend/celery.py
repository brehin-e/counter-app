import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
app.conf.beat_schedule = {
    "update-cities-every-5-minutes": {
        "task": "cities.tasks.fetch_and_update_cities",
        "schedule": crontab(minute="*/5"),
    },
}