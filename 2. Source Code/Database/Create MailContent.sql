USE CapstonesNoRelation
GO

DROP TABLE IF EXISTS dbo.MailContent
CREATE TABLE MailContent
(
	ID INT PRIMARY KEY IDENTITY,
	Code NVARCHAR(MAX) NOT NULL,
	[Subject] NVARCHAR(MAX),
	Content NVARCHAR(MAX)
)
GO


DROP PROC IF EXISTS AddMailContent
GO
CREATE PROC AddMailContent
@code NVARCHAR(MAX), @subject NVARCHAR(MAX), @content NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.MailContent
	(
	    Code,
	    Subject,
	    Content
	)
	OUTPUT Inserted.*
	VALUES
	(   @code, -- Code - nvarchar(max)
	    @subject, -- Subject - nvarchar(max)
	    @content  -- Content - nvarchar(max)
	    )
END
GO

DROP PROC IF EXISTS GetMailContentByID
GO
CREATE PROC GetMailContentByID
@id INT
AS
BEGIN
    SELECT * FROM dbo.MailContent WHERE ID = @id
END
GO

DROP PROC IF EXISTS GetMailContentByCode
GO
CREATE PROC GetMailContentByCode
@code NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM dbo.MailContent WHERE Code = @code
END
GO

DROP PROC IF EXISTS DeleteMailContentByID
GO
CREATE PROC DeleteMailContentByID
@id INT
AS
BEGIN
	DELETE FROM dbo.MailContent WHERE ID = @id
END 
GO

DROP PROC IF EXISTS DeleteMailContentByCode
GO
CREATE PROC DeleteMailContentByCode
@code NVARCHAR(MAX)
AS
BEGIN
	DELETE FROM dbo.MailContent WHERE Code = @code
END 
GO

EXEC dbo.AddMailContent @code = N'SEND_OTP',    -- nvarchar(max)
                        @subject = N'SOFA - MÃ XÁC THỰC', -- nvarchar(max)
                        @content = N'<b>Xin chào @lastname</b>
    <p>Chúng tôi nhận được yêu cầu cung cấp mã xác thực cho tài khoản SOFA của bạn</p>
    <p>Dưới đây là mã xác thực cho giao dịch. Mã xác thực sẽ hết hạn sau 60 giây. Để đảm bảo an toàn, vui lòng không cung cấp mã xác thực cho bất kỳ ai khác.</p>
    <p>Mã xác thực của bạn là: <b>@otp</b> </p>
    <p>Chúc bạn một ngày tốt lành</p>'  -- nvarchar(max)

EXEC dbo.GetMailContentByCode @code = N'send_otp' -- nvarchar(max)
