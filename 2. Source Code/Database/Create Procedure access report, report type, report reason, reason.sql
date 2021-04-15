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
	SELECT Reason.Id, Name, Description, ReportTypeID FROM dbo.ReportReason
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

DROP PROC IF EXISTS ExistsReportPost
GO
CREATE PROC ExistsReportPost
@accountID INT, @postID INT
AS
BEGIN
	SELECT * FROM dbo.Report 
	WHERE FromAccount = 13 AND ToPost = 85

END
GO

EXEC dbo.AddReason @name = N'Giả mạo người khác', -- nvarchar(max)
                   @des = N'Tài khoản này giả mạo người khác',   -- nvarchar(max)
				   @reportTypeID = 2
EXEC dbo.AddReason @name = N'Đăng nội dung không phù hợp', -- nvarchar(max)
                   @des = N'Tài khoản này đăng nội dung không đúng quy định',   -- nvarchar(max)
				   @reportTypeID = 2

EXEC dbo.GetAllReport
EXEC dbo.GetAllreasonOfReport @reportID = 9 -- int
EXEC dbo.GetAllReason

DELETE FROM dbo.Report
DELETE FROM dbo.ReportReason