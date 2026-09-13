from rest_framework.routers import DefaultRouter

from .views import LiveDocViewSet, MessageViewSet, RoomViewSet

router = DefaultRouter()
router.register(r"notes", MessageViewSet, basename="note")
router.register(r"livedoc", LiveDocViewSet, basename="livedoc")
router.register(r"rooms", RoomViewSet, basename="Room")

urlpatterns = router.urls
