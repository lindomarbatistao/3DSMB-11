from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('subjects', SubjectsView.as_view()),
    path('subject/<int:pk>', SubjectsDetailView.as_view()),
    path('logout', logout_view, name='logout'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
