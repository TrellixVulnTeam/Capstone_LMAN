USE [CapstonesNoRelation]
GO

CREATE PROC CreateNewFeedback
(@title nvarchar(max), @content nvarchar(max), @userFeedbackId int, @status int)
AS
BEGIN
INSERT INTO [dbo].[Feedback]
           ([Title]
           ,[Content]
           ,[UserFeedbackId]
		   ,[LastUpdated]
           ,[Status])
		   OUTPUT inserted.*
     VALUES
           (@title
           ,@content
           ,@userFeedbackId
		   ,@lastUpdated
           ,@status)
END

GO

CREATE PROC GetFeedbackByUserId
@userId int
AS
BEGIN
SELECT * FROM Feedback
WHERE UserFeedbackId = @userId
ORDER BY LastUpdated DESC
END

GO

CREATE PROC GetFeedbackById
@feedbackId int
AS
BEGIN
SELECT * FROM Feedback
WHERE Id = @feedbackId
END

GO


