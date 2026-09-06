from rest_framework.routers import DefaultRouter

from .views import LiveDocViewSet, NoteViewSet, RoomViewSet

router = DefaultRouter()
router.register(r"notes", NoteViewSet, basename="note")
router.register(r"livedoc", LiveDocViewSet, basename="livedoc")
router.register(r"rooms", RoomViewSet, basename="Room")

urlpatterns = router.urls
