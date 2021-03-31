CREATE PROCEDURE setReadNotificationById
@ID int
AS
BEGIN
	UPDATE [Notification]
	SET IsRead = 1
	WHERE Id = @ID
END

USE[CapstonesNoRelation]
GO
EXEC setReadNotificationById 80






