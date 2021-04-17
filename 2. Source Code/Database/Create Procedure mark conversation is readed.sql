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

DROP PROC IF EXISTS GetMessageByID
GO
CREATE PROC GetMessageByID
@messID INT
AS
BEGIN
	SELECT * FROM dbo.Message WHERE Id = @messID
END
GO

DROP PROC IF EXISTS MarkMessageIsReaded
GO
CREATE PROC MarkMessageIsReaded
@messID INT
AS
BEGIN
	UPDATE dbo.Message SET IsRead = 1 WHERE Id = @messID
END
GO
EXEC dbo.MarkConversationIsReaded @fromAccount = 22, -- int
                                  @toAccount = 21    -- int

EXEC dbo.GetNumberUnreadMessage @userID = 21 -- int

SELECT * FROM dbo.Account
SELECT * FROM dbo.Message WHERE ToAccountId = 21

EXEC dbo.GetMessageByID @messID = 221 -- int


