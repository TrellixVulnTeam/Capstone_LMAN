CREATE PROCEDURE getNotificationByToAccount
@accountID int
AS
BEGIN
	SELECT *
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID
	ORDER BY DateCreated desc
END

USE[CapstonesNoRelation]
GO
EXEC getNotificationByToAccount 7













