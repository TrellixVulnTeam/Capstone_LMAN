USE [CapstonesNoRelation]
GO
CREATE Proc CreateNewConversation
(@TimeCreate datetime, @TimeUpdate datetime, @AccountId1 int, @AccountId2 int, @Account1Delete bit, @Account2Delete bit)
AS
BEGIN
INSERT INTO [dbo].[Conversation]
           ([TimeCreate]
           ,[TimeUpdate]
           ,[AccountId1]
           ,[AccountId2]
           ,[Account1Delete]
           ,[Account2Delete])
     VALUES
           (@TimeCreate
           ,@TimeUpdate
           ,@AccountId1
           ,@AccountId2
           ,@Account1Delete
           ,@Account2Delete)
END


