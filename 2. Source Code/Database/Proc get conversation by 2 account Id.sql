
CREATE PROC GetConversationBy2AccountId
(@AccountId1 int, @AccountId2 int)
AS
BEGIN
SELECT * FROM Conversation
Where (AccountId1 = @AccountId1 and AccountId2 = @AccountId2) or (AccountId1 = @AccountId2 and AccountId2 = @AccountId1)
END

