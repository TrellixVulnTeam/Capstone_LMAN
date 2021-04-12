
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
