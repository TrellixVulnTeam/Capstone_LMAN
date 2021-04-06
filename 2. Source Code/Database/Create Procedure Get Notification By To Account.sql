USE[CapstonesNoRelation]
GO

DROP PROC IF EXISTS  getNotificationByToAccount
GO
CREATE PROCEDURE getNotificationByToAccount
@accountID int, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT *, DATEDIFF(day,Notification.DateCreated,GETDATE()) AS CountDate
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID AND DATEDIFF(day,Notification.DateCreated,GETDATE()) < 5
	ORDER BY IsRead ASC, DateCreated desc
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END

SELECT DATEDIFF(day,'2021/04/05 08:00',GETDATE())

EXEC getNotificationByToAccount 13,2,7













