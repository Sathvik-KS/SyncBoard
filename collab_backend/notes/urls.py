from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, LiveDocViewSet

router = DefaultRouter()
router.register(r"notes", NoteViewSet, basename='note')
router.register(r"livedoc", LiveDocViewSet, basename='livedoc')

urlpatterns = router.urls