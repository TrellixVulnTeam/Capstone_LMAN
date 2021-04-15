USE CapstonesNoRelation
GO

DROP PROC IF EXISTS GetNumberUnreadMessage
GO
CREATE PROC GetNumberUnreadMessage
@userID INT
AS
BEGIN
	SELECT COUNT(DISTINCT(ConversationId)) 
	FROM Message
	WHERE ((FromAccountId = @userID AND SenderDeleted = 0)OR (ToAccountId = @userID AND ReceiverDeleted = 0)) AND IsRead = 0 
END
GO