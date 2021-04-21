USE CapstonesNoRelation
GO

DROP PROC IF EXISTS GetAllPublicPost
GO
CREATE PROC GetAllPublicPost
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS GetAllPublicPostOfFashionista
GO
CREATE PROC GetAllPublicPostOfFashionista
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	INNER JOIN dbo.Profile ON AccountPost=AccountId AND IsFashionista=1
	WHERE PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

EXEC dbo.GetAllPublicPostOfFashionista @page = 1,      -- int
                                       @rowsOfPage = 10 -- int
SELECT * FROM dbo.Image WHERE PostId = 98

DROP PROC IF EXISTS GetPostByInfoID
GO
CREATE PROC GetPostByInfoID
@infoID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM Post
	WHERE BodyInfoID = @infoID AND PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS GetAllPostOfUser
GO
CREATE PROC GetAllPostOfUser
@accountPost INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE AccountPost = @accountPost
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS GetAllPublicPostOfUser
GO
CREATE PROC GetAllPublicPostOfUser
@accountPost INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE AccountPost = @accountPost 
	AND PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS GetPostByID
GO
CREATE PROC GetPostByID
@postID INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar, BodyInfoID, IsVerified, [Type]
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	WHERE Post.Id = @postID;
END
GO

DROP PROC IF EXISTS GetPostByBodyInfoID
GO
CREATE PROC GetPostByBodyInfoID
@bodyInfoID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar, BodyInfoID, RatingAvg.Average AS RateAVG, IsVerified, [Type]
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	INNER JOIN 
	(
		SELECT PostId, AVG(CAST(RatePoint AS FLOAT))  AS Average 
		FROM dbo.Rate 
		GROUP BY PostId
	) AS RatingAvg ON RatingAvg.PostId = Post.Id
	WHERE Post.BodyInfoID = @bodyInfoID AND RatingAvg.Average>=(CAST(3.5 AS FLOAT)) AND IsVerified = 1
	ORDER BY RateAVG DESC, Time DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS SearchPostByText
GO
CREATE PROC SearchPostByText
@keyWord NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT dbo.Post.* FROM dbo.Post
	INNER JOIN dbo.Profile ON AccountPost = AccountId
	WHERE IsVerified = 1 AND (Content LIKE '%' + @keyWord + '%') OR (CONCAT(FirstName, ' ', LastName) LIKE '%' + @keyWord + '%')
	ORDER BY Time DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS AddNewPost
GO
CREATE PROC AddNewPost
@content NVARCHAR(MAX), @privacyID INT, @accountPost INT, @bodyInfoID INT, @isVerified BIT, @type INT
AS
BEGIN
	INSERT INTO dbo.Post
	(
	    Content,
	    PrivacyID,
	    Time,
	    AccountPost,
		BodyInfoID,
		IsVerified,
		Type
	)
	OUTPUT Inserted.*
	VALUES
	(   @content,       -- Content - nvarchar(max)
	    @privacyID,         -- PrivacyID - int
	    GETDATE(), -- Time - datetime
	    @accountPost ,         -- AccountPost - int
		@bodyInfoID,
		@isVerified,
		@type
	    )
END
GO

DROP PROC IF EXISTS UpdatePost
GO
CREATE PROC UpdatePost
@postId INT, @content NVARCHAR(MAX), @privacyID INT, @time DATETIME, @bodyInfoID INT, @isVerified BIT
AS
BEGIN
	UPDATE dbo.Post 
	SET Content = @content, PrivacyID = @privacyID, Time = @time, IsVerified = @isVerified, BodyInfoID = @bodyInfoID
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
	DECLARE @likeID INT
	SET @likeID = (SELECT ID FROM [Like] WHERE PostID = @postID AND AccountLike = @accountLike)
	PRINT @likeID
	IF @likeID IS NULL
	BEGIN
		INSERT INTO dbo.[Like]
		(
			PostId,
			AccountLike
		)
		OUTPUT Inserted.ID
		VALUES
		(   @postID, -- PostId - int
			@accountLike  -- AcountLike - int
			)
	END
	ELSE
	BEGIN
		SELECT 0
	END
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
	    Content,
		[Time]
	)
	OUTPUT inserted.*
	VALUES
	(   @accountID,  -- AccountId - int
	    @postID,  -- PostId - int
	    @content, -- Content - nvarchar(max)
		GETDATE()
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
@postID INT, @page INT, @rowsOfPage INT
AS
BEGIN
    SELECT * FROM dbo.Comment 
	WHERE PostId = @postID
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
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

DROP PROC IF EXISTS GetPostRateAverage
GO
CREATE PROC GetPostRateAverage
@postID INT
AS
BEGIN
	SELECT AVG(Cast(RatePoint as float)) FROM Rate WHERE PostID = @postID
END
GO

DROP PROC IF EXISTS GetRateOfUserForPost
GO
CREATE PROC GetRateOfUserForPost
@postID INT, @accountID INT
AS
BEGIN
	SELECT * FROM RATE
	WHERE PostID = @postID AND AccountRate = @accountID
END
GO

DROP PROC IF EXISTS GetLikeOfUserForPost
GO
CREATE PROC GetLikeOfUserForPost
@postID INT, @accountID INT
AS
BEGIN
		SELECT * FROM [Like] WHERE PostID = @postID AND AccountLike = @accountID 
END
GO

DROP PROC IF EXISTS CreateRate
GO
CREATE PROC CreateRate
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	DECLARE @rateID INT;
	SET @rateID = (SELECT ID FROM Rate WHERE PostID = @postID AND AccountRate = @accountRate);
	IF (@rateID IS NULL OR @rateID = 0) 
	BEGIN
		INSERT dbo.Rate VALUES(@postID, @accountRate, @ratePoint)
	END
	ELSE
	BEGIN
		UPDATE dbo.Rate SET RatePoint = @ratePoint WHERE ID = @rateID
	END
END
GO

DROP PROC IF EXISTS AddMarkupPost
GO
CREATE PROC AddMarkupPost
@postID INT, @accountID INT
AS
BEGIN
	DECLARE @markupID INT
	SET @markupID = (SELECT Id FROM dbo.MarkUpPost WHERE PostId = @postID AND AccountId = @accountID)
	IF @markupID IS NULL
	BEGIN
		INSERT INTO MarkupPost(PostID, AccountID)
		OUTPUT Inserted.*
		VALUES(@postID, @accountID)
	END
	ELSE
	BEGIN
		SELECT 0 AS ID, 0 AS PostID, 0 AS AccountID
	END
END
GO

DROP PROC IF EXISTS GetAllMarkupPost
GO
CREATE PROC GetAllMarkupPost
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.* FROM MarkupPost
	INNER JOIN Post ON Post.Id = MarkupPost.PostID
	ORDER BY MarkupPost.id ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS GetMarkupPostOfUser
GO
CREATE PROC GetMarkupPostOfUser
@accountID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.* FROM MarkupPost
	INNER JOIN Post ON Post.Id = MarkupPost.PostID
	WHERE AccountId = @accountID
	ORDER BY MarkupPost.id ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO

DROP PROC IF EXISTS DeleteMarkupPost
GO
CREATE PROC DeleteMarkupPost
@postID INT, @accountID INT
AS
BEGIN
	DELETE FROM MarkupPost WHERE PostID = @postID AND AccountID = @accountID
END
GO

DROP PROC IF EXISTS GetMarkupPostByPostIDAndAccountID
GO
CREATE PROC GetMarkupPostByPostIDAndAccountID
@postID INT, @accountID INT
AS
BEGIN
	SELECT * FROM MarkupPost WHERE PostID = @postID AND accountID = @accountID
END
GO

DROP PROC IF EXISTS CountPublicPostOfUser
GO
CREATE PROC CountPublicPostOfUser
@accountID INT
AS
BEGIN
	SELECT COUNT(*) FROM dbo.Post WHERE AccountPost = @accountID AND PrivacyID = 3
END
GO