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

DROP PROC IF EXISTS MarkAllNotificationAsReaded
GO
CREATE PROC MarkAllNotificationAsReaded
@accountID INT
AS
BEGIN
	UPDATE dbo.Notification SET IsRead = 1 WHERE ToAccount = @accountID
END
GO






