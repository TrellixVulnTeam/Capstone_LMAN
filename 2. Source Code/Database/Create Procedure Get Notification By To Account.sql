CREATE PROCEDURE getNotificationByToAccount
@accountID int
AS
BEGIN
	SELECT *
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID
END

USE[CapstonesNoRelation]
GO
EXEC getNotificationByToAccount 2












