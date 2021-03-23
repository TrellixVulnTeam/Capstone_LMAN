CREATE PROCEDURE getNotificationByToAccount
@accountID int
AS
BEGIN
	SELECT *
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID
END

EXEC getNotificationByToAccount 2













