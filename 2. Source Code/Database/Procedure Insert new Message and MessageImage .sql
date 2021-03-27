USE [CapstonesNoRelation]
GO
CREATE PROC AddNewMessage
(@FromAccountId int, @ToAccountId int, @Content nvarchar(max), @SenderDeleted bit, @ReceiverDeleted bit, @IsRead bit, @ConversationId int, @Time datetime)
AS
BEGIN
INSERT INTO [dbo].[Message]
           ([FromAccountId]
           ,[ToAccountId]
           ,[Content]
           ,[SenderDeleted]
           ,[ReceiverDeleted]
           ,[IsRead]
           ,[ConversationId]
           ,[Time])
		   OUTPUT inserted.*
     VALUES
           (@FromAccountId
           ,@ToAccountId
           ,@Content
           ,@SenderDeleted
           ,@ReceiverDeleted 
           ,@IsRead
           ,@ConversationId
           ,@Time)
END

GO
CREATE PROC AddNewMessageImage
(@time nvarchar(max), @Url nvarchar(max))
AS
BEGIN
INSERT INTO [dbo].[MessageImage]
           ([MessageId]
           ,[Url])
			OUTPUT inserted.*
     VALUES
           ((select Id from Message where Time = @time)
           ,@Url)
END 

