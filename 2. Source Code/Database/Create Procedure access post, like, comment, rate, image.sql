USE CapstonesNoRelation
GO

DROP PROC IF EXISTS GetPostByID
GO
CREATE PROC GetPostByID
@postID INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar 
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	WHERE Post.Id = @postID;
END
GO

DROP PROC IF EXISTS AddNewPost
GO
CREATE PROC AddNewPost
@content NVARCHAR(MAX), @privacyID INT, @accountPost INT
AS
BEGIN
	INSERT INTO dbo.Post
	(
	    Content,
	    PrivacyID,
	    Time,
	    AccountPost
	)
	OUTPUT Inserted.*
	VALUES
	(   @content,       -- Content - nvarchar(max)
	    @privacyID,         -- PrivacyID - int
	    GETDATE(), -- Time - datetime
	    @accountPost          -- AccountPost - int
	    )
END
GO

DROP PROC IF EXISTS UpdatePost
GO
CREATE PROC UpdatePost
@postId INT, @content NVARCHAR(MAX), @privacyID INT, @time DATETIME
AS
BEGIN
	UPDATE dbo.Post 
	SET Content = @content, PrivacyID = @privacyID, Time = GETDATE()
	WHERE Id = @postId
END
GO

DROP PROC IF EXISTS DeletePost
GO
CREATE PROC DeletePost
@postID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE PostId = @postID
	DELETE FROM dbo.Comment WHERE PostId = @postID
	DELETE FROM dbo.[Like] WHERE PostId = @postID
	DELETE FROM dbo.Rate WHERE PostId = @postID
	DELETE FROM dbo.MarkUpPost WHERE PostId = @postID
	DELETE FROM dbo.Post WHERE Id = @postID
END
GO

DROP PROC IF EXISTS AddNewImage
GO
CREATE PROC AddNewImage
@postID INT, @url NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Image
	(
	    PostId,
	    Url
	)
	OUTPUT Inserted.*
	VALUES
	(   @postID,  -- PostId - int
	    @url -- Url - nvarchar(max)
	)
END
GO
DROP PROC IF EXISTS UpdateImage
GO
CREATE PROC UpdateImage
@imageID INT, @url NVARCHAR(MAX)
AS
BEGIN
	UPDATE [Image] SET [Url] = @url WHERE ID = @imageID
END
GO

DROP PROC IF EXISTS LikePost
GO
CREATE PROC LikePost
@postID INT, @accountLike INT
AS
BEGIN
	INSERT INTO dbo.[Like]
	(
	    PostId,
	    AccountLike
	)
	VALUES
	(   @postID, -- PostId - int
	    @accountLike  -- AcountLike - int
	    )
END
GO
DROP PROC IF EXISTS UnlikePost
GO
CREATE PROC UnlikePost
@postID INT, @accountLike INT
AS
BEGIN
	DELETE FROM dbo.[Like] WHERE PostId = @postID AND AccountLike = @accountLike
END
GO

DROP PROC IF EXISTS CountLikeOfPost
GO
CREATE PROC CountLikeOfPost
@postID INT
AS
BEGIN
    SELECT COUNT(*) AS NumberOfLike FROM dbo.[Like] WHERE PostId = @postID
END
GO

DROP PROC IF EXISTS GetAllLikeOfPost
GO
CREATE PROC GetAllLikeOfPost
@postID INT
AS
BEGIN
	SELECT * FROM dbo.[Like]
	WHERE PostId = @postID
END
GO

DROP PROC IF EXISTS CreateComment
GO
CREATE PROC CreateComment
@accountID INT, @postID INT, @content NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Comment
	(
	    AccountId,
	    PostId,
	    Content
	)
	VALUES
	(   @accountID,  -- AccountId - int
	    @postID,  -- PostId - int
	    @content -- Content - nvarchar(max)
	    )
END
GO

DROP PROC IF EXISTS UpdateComment
GO
CREATE PROC UpdateComment
@accountID INT, @postID INT, @content NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Comment
	SET Content = @content
	WHERE AccountId = @accountID AND PostId = @postID
END
GO

DROP PROC IF EXISTS DeleteComment
GO
CREATE PROC DeleteComment
@accountID INT, @postID INT
AS
BEGIN
	DELETE FROM dbo.Comment WHERE AccountId = @accountID AND PostId = @postID
END
GO

DROP PROC IF EXISTS CountCommentOfPost
GO
CREATE PROC CountCommentOfPost
@postID INT
AS
BEGIN
    SELECT COUNT(*) AS NumberOfComment FROM dbo.Comment WHERE PostId = @postID
END
GO

DROP PROC IF EXISTS GetAllCommentOfPost
GO
CREATE PROC GetAllCommentOfPost
@postID INT
AS
BEGIN
    SELECT * FROM dbo.Comment WHERE PostId = @postID
END
GO

DROP PROC IF EXISTS CreateRate
GO
CREATE PROC CreateRate
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	INSERT dbo.Rate
	(
	    PostId,
	    AccountRate,
	    RatePoint
	)
	VALUES
	(   @postID, -- PostId - int
	    @accountRate, -- AcountRate - int
	    @ratePoint  -- RatePoint - int
	    )
END
GO

DROP PROC IF EXISTS UpdateRate
GO
CREATE PROC UpdateRate
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	UPDATE dbo.Rate 
	SET RatePoint = @ratePoint
	WHERE PostId = @postID AND AccountRate = @accountRate
END
GO

DROP PROC IF EXISTS GetAllRateOfPost
GO
CREATE PROC GetAllRateOfPost
@postID INT
AS
BEGIN
    SELECT * FROM dbo.Rate
	WHERE PostId = @postID
END
GO
