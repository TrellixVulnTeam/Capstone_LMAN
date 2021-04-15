USE CapstonesNoRelation
GO

--------------------------------------------------------------------------
DROP PROC IF EXISTS GetAllTypeReport
GO
CREATE PROC GetAllTypeReport
AS
BEGIN
	SELECT * FROM dbo.ReportType
END
GO

DROP PROC IF EXISTS GetReportTypeByID
GO
CREATE PROC GetReportTypeByID
@typeID INT
AS
BEGIN
	SELECT * FROM dbo.ReportType WHERE Id = @typeID
END
GO

DROP PROC IF EXISTS AddReportType
GO
CREATE PROC AddReportType
@name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	INSERT dbo.ReportType
	(
	    Name,
	    Description
	)
	OUTPUT Inserted.*
	VALUES
	(   @name, -- Name - nvarchar(50)
	    @des  -- Description - nvarchar(max)
	    )
END
GO

DROP PROC IF EXISTS DeleteTypeReportByID
GO
CREATE PROC DeleteTypeReportByID
@typeID INT
AS
BEGIN
	DELETE FROM dbo.ReportType WHERE Id = @typeID
END
GO

DROP PROC IF EXISTS UpdateReportType
GO
CREATE PROC UpdateReportType
@typeID INT, @name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.RelationType SET Name = @name, Description = @des WHERE Id = @typeID
END
GO
---------------------------------------------------------------------------------
DROP PROC IF EXISTS GetAllReason
GO
CREATE PROC GetAllReason
AS
BEGIN
	SELECT * FROM dbo.Reason
END
GO

DROP PROC IF EXISTS AddReason
GO
CREATE PROC AddReason
@name NVARCHAR(MAX), @des NVARCHAR(MAX), @reportTypeID INT
AS
BEGIN
	INSERT dbo.Reason
	(
	    Name,
	    Description,
		ReportTypeID
	)
	OUTPUT Inserted.*
	VALUES
	(   @name, -- Name - nvarchar(50)
	    @des,  -- Description - nvarchar(max)
		@reportTypeID
	    )
END
GO

DROP PROC IF EXISTS DeleteReasonByID
GO
CREATE PROC DeleteReasonByID
@reasonID INT
AS
BEGIN
	DELETE FROM dbo.Reason WHERE Id = @reasonID
END
GO

DROP PROC IF EXISTS UpdateReason
GO
CREATE PROC UpdateReason
@reasonID INT, @name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Reason SET Name = @name, Description = @des WHERE Id = @reasonID
END
GO
---------------------------------------------------------------------------------

---------------------------------------------------------------------------------
DROP PROC IF EXISTS GetAllReport
GO
CREATE PROC GetAllReport
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
END
GO

DROP PROC IF EXISTS GetAllReportFromAccount
GO
CREATE PROC GetAllReportFromAccount
@accountID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE FromAccount = @accountID
END
GO

DROP PROC IF EXISTS GetAllReportToAccount
GO
CREATE PROC GetAllReportToAccount
@accountID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToAccount = @accountID
END
GO

DROP PROC IF EXISTS GetAllReportToPost
GO
CREATE PROC GetAllReportToPost
@postID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToPost = @postID
END
GO

DROP PROC IF EXISTS GetAllReportToComment
GO
CREATE PROC GetAllReportToComment
@commentID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToPost = @commentID
END
GO

DROP PROC IF EXISTS GetAllReportPost
GO
CREATE PROC GetAllReportPost
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'Post')
END
GO

DROP PROC IF EXISTS GetAllReportUser
GO
CREATE PROC GetAllReportUser
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'User')
END
GO
DROP PROC IF EXISTS GetAllReportComment
GO
CREATE PROC GetAllReportComment
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'Comment')
END
GO

DROP PROC IF EXISTS GetAllReasonOfReport
GO
CREATE PROC GetAllreasonOfReport
@reportID INT
AS
BEGIN
	SELECT Reason.Id, Name, Description FROM dbo.ReportReason
	INNER JOIN dbo.Reason ON Reason.Id=ReasonId
	WHERE ReportId = @reportID
END
GO

DROP PROC IF EXISTS CreateReport
GO
CREATE PROC CreateReport
@fromAccount INT, @toAccount INT, @toPost INT, @toComment INT, @typeReport INT, @reportContent NVARCHAR(MAX)
AS
BEGIN
	INSERT dbo.Report
	(
	    FromAccount,
	    ToAccount,
	    ToPost,
	    ToComment,
	    TypeReport,
	    ReportContent
	)
	OUTPUT Inserted.*
	VALUES
	(   @fromAccount,  -- FromAccount - int
	    @toAccount,  -- ToAccount - int
	    @toPost,  -- ToPost - int
	    @toComment,  -- ToComment - int
	    @typeReport,  -- TypeReport - int
	    @reportContent -- ReportContent - nvarchar(max)
	    )
END
GO

DROP PROC IF EXISTS UpdateReport
GO
CREATE PROC UpdateReport
@reportID INT, @fromAccount INT, @toAccount INT, @toPost INT, @toComment INT, @typeReport INT, @reportContent NVARCHAR(MAX), @isProcessed INT
AS
BEGIN
	UPDATE dbo.Report SET 
	FromAccount = @fromAccount, 
	ToAccount = @toAccount, 
	ToPost = @toPost, 
	TypeReport = @typeReport, 
	ReportContent = @reportContent
	WHERE Id = @reportID
END
GO


DROP PROC IF EXISTS AddReasonForReport
GO
CREATE PROC AddReasonForReport
@reportID INT, @reasonID INT
AS
BEGIN
	INSERT dbo.ReportReason
	(
	    ReportId,
	    ReasonId
	)
	OUTPUT Inserted.*
	VALUES
	(   @reportID, -- ReportId - int
	    @reasonID  -- ReasonId - int
	    )
END
GO

EXEC dbo.AddReportType @name = N'Post', -- nvarchar(max)
                       @des = N'Report đối với bài đăng'   -- nvarchar(max)
EXEC dbo.AddReportType @name = N'User', -- nvarchar(max)
                       @des = N'Report đối với người dùng'   -- nvarchar(max)
EXEC dbo.AddReportType @name = N'Comment', -- nvarchar(max)
                       @des = N'Report đối với bình luận'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Nội dung không phù hợp', -- nvarchar(max)
                   @des = N'Nội dung không liên quan đến thời trang'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Ảnh khỏa thân', -- nvarchar(max)
                   @des = N'Nội dung khỏa thân'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Bạo lực', -- nvarchar(max)
                   @des = N'Nội dung bạo lực'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Quấy rối', -- nvarchar(max)
                   @des = N'Có hành vi quấy rối người khác'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Gây thương tích', -- nvarchar(max)
                   @des = N'Gây thương tích cho người hoặc động vật'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Thông tin sai sự thật', -- nvarchar(max)
                   @des = N'Chứa thông tin không đúng sự thật'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Bán hàng trái phép', -- nvarchar(max)
                   @des = N'Bài viết bán hàng không đúng quy định'   -- nvarchar(max)
EXEC dbo.AddReason @name = N'Khủng bố', -- nvarchar(max)
                   @des = N'Ngôn ngữ gây thù địch, có nội dung khủng bố'   -- nvarchar(max)

EXEC dbo.AddReason @name = N'Giả mạo người khác', -- nvarchar(max)
                   @des = N'Tài khoản này giả mạo người khác'   -- nvarchar(max)


EXEC dbo.GetAllReport
EXEC dbo.GetAllreasonOfReport @reportID = 1 -- int
EXEC dbo.GetAllReason

DELETE FROM dbo.Report
DELETE FROM dbo.ReportReason