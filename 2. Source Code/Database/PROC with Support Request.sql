USE [CapstonesNoRelation]
GO

CREATE PROC CreateNewSupportRequest
(@requestType int, @userRequestId int, @timeCreate datetime, @status int, @respone nvarchar(max))
AS
BEGIN
INSERT INTO [dbo].[SupportRequest]
           ([RequestType]
           ,[UserRequestId]
           ,[TimeCreate]
           ,[Status]
           ,[Respone])
		   OUTPUT inserted.*
     VALUES
           (@requestType
           ,@userRequestId
           ,@timeCreate
           ,@status
           ,@respone)
END
GO

CREATE PROC GetSupportRequest
(@userId int, @requestType int)
AS
BEGIN
SELECT * FROM SupportRequest
WHERE UserRequestId = @userId and RequestType = @requestType
END




