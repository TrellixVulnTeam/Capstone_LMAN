USE CapstonesNoRelation
GO


DROP PROC IF EXISTS GetImagePostByID
GO
CREATE PROC GetImagePostByID
@id INT
AS
BEGIN
	SELECT * FROM dbo.Image WHERE Id = @id
END
GO

DROP PROC IF EXISTS GetImagesOfPostByPostID
GO
CREATE PROC GetImagesOfPostByPostID
@id INT
AS
BEGIN
	SELECT * FROM dbo.Image WHERE PostId = @id
END
GO

DROP PROC IF EXISTS AddImagePost
GO
CREATE PROC AddImagePost
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

DROP PROC IF EXISTS DeleteImagePostByImageID
GO
CREATE PROC DeleteImagePostByImageID
@imageID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE Id = @imageID
END
GO

DROP PROC IF EXISTS DeleteAllImagesPostByPostID
GO
CREATE PROC DeleteAllImagesPostByPostID
@postID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE PostId = @postID
END
GO

DROP PROC IF EXISTS UpdateImagePostByID
GO
CREATE PROC UpdateImagePostByID
@id INT, @url NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Image SET [Url]=@url
END
GO