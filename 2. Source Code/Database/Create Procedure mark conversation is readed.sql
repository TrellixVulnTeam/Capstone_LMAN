USE CapstonesNoRelation 
GO

DROP PROC IF EXISTS MarkConversationIsReaded
GO
CREATE PROC MarkConversationIsReaded
@fromAccount INT, @toAccount INT
AS
BEGIN
	UPDATE dbo.Message SET IsRead = 1 WHERE (ToAccountId = @toAccount) AND (FromAccountId = @fromAccount) AND IsRead = 0 AND ReceiverDeleted = 0
END
GO

EXEC dbo.MarkConversationIsReaded @fromAccount = 7, -- int
                                  @toAccount = 21    -- int
