USE[CapstonesNoRelation]
GO

DROP PROC IF EXISTS  getNotificationByToAccount
GO
CREATE PROCEDURE getNotificationByToAccount
@accountID int, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT *
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID
	ORDER BY DateCreated desc
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END


EXEC getNotificationByToAccount 7,3,3













