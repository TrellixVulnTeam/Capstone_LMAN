
CREATE PROC [dbo].[GetUserDetailByID]
@AccountId INT
AS
BEGIN
    SELECT a.Id, a.UserName, a.IsActive, a.DateCreated, p.FirstName, p.LastName, p.Gender, p.DOB, p.Email, p.Phone, p.Address, p.Avatar, i.height, i.weight, i.WaistSize, i.BustSize, i.HipSize
	FROM Account a inner join Profile p on a.Id = p.AccountId left join Info i on p.AccountId = i.AccountId
	WHERE a.Id = @AccountId
END
--------------------------------
CREATE PROC [dbo].[GetUserBalanceById]
@AccountId INT
AS
BEGIN
 SELECT *
 FROM Transactions t inner join AccountLogs al on t.Id = al.TransactionId
 where AccountID = @AccountId
END
-----------------------
CREATE PROCEDURE [dbo].[GetPostByUserWithoutPaging]
@AccountId INT
AS
BEGIN
	SELECT *
	FROM Post p
	WHERE p.AccountPost = @AccountId
	ORDER BY p.Time DESC
END
--------------------
CREATE PROCEDURE [dbo].[BanUser]
@AccountId INT
AS
BEGIN
	UPDATE Account
	SET IsActive = 0
	WHERE Id = @AccountId;
END
-----------------
CREATE PROCEDURE [dbo].[UnbanUser]
@AccountId INT
AS
BEGIN
	UPDATE Account
	SET IsActive = 1
	WHERE Id = @AccountId;
END
-----------------------
CREATE PROC [dbo].[GetAllCommentOfPostWithoutPaging]
@postID INT
AS
BEGIN
    SELECT * FROM dbo.Comment 
	WHERE PostId = @postID
	ORDER BY [Time] ASC
END

---
CREATE PROC [dbo].DeleteVoucher
@VoucherId INT
AS
BEGIN
    DELETE FROM dbo.Voucher 
	WHERE Id = @VoucherId
END

-----
CREATE PROC [dbo].GetVoucherById
@VoucherId INT
AS
BEGIN
    SELECT v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
	FROM Voucher v , AccountVoucher av
	WHERE  v.Id= av.VoucherId
END
------------------------------
CREATE PROC [dbo].GetAllUserFeedback
AS
BEGIN
    SELECT *
	FROM Feedback f, Account a
	WHERE f.UserFeedbackId = a.Id
	ORDER BY f.LastUpdated DESC
END

-------------------------------
CREATE PROCEDURE [dbo].[AddNewNotificationFeedback] @TypeNotification int, @Content nvarchar(MAX), @FromAccount int, @ToAccount int, @DateCreated datetime
AS
INSERT INTO [Notification](TypeNotification, IsRead, Content, FromAccount, ToAccount, DateCreated ) 
values(@TypeNotification, 0, @Content, @FromAccount, @ToAccount, @DateCreated)

------------------------------
CREATE PROC [dbo].[UpdateFeedbackStatus]
@feedbackId INT, @lastUpdated DATETIME
AS
BEGIN
	UPDATE Feedback
	SET Status = 2, LastUpdated = @lastUpdated
	WHERE Id = @feedbackId
END
----------------
CREATE PROCEDURE [dbo].[GetDetailUserSupport]
AS
	SELECT c.Id as UserId, c.UserName, p.Email, p.Phone, p.FirstName, p.LastName, sr.id as RequestId, sr.TimeCreate, sr.Status
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId 
	inner join Role r on ar.RoleId = r.Id
	inner join SupportRequest sr on c.id = sr.UserRequestId
---------------------
Create PROCEDURE [dbo].[SetUserIsFashionista] @UserId int
AS
Begin
	UPDATE SupportRequest
	SET Status = 1
	WHERE SupportRequest.UserRequestId = @UserId

	UPDATE Profile
	SET IsFashionista = 1
	WHERE Profile.AccountId = @UserId
End
