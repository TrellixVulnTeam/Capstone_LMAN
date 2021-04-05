------------------
Create PROCEDURE GetAllUserWithoutPaging
AS
	SELECT c.Id, c.UserName, p.Email, p.FirstName, p.LastName, p.Phone, p.Avatar, c.DateCreated, c.IsActive 
	FROM Account c inner join Profile p on c.Id = p.AccountId
	ORDER BY c.DateCreated DESC
GO
----------------
Create PROCEDURE GetAllPostWithoutPaging
AS
	SELECT *
	FROM Post p
	ORDER BY p.Time DESC
GO
-------------------
Create PROCEDURE GetUserById @Id int
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.Id = @Id
GO
---------------
create procedure [dbo].[GetAllVoucher]
AS
Begin
select v.Id, v.Title, v.Content, v.Code, a.UserName as createdBy, v.ToDate as expiredDate
from Voucher v inner join AccountVoucher av on v.Id = av.VoucherId inner join Account a on av.AccountId = a.Id
End
------------------
Create PROCEDURE [dbo].[getAllBalance]
AS
BEGIN
SELECT TOP 1 [Balance] FROM (Select  accLogs.AfterBalance Balance,tr.[Date]
From Transactions tr, AccountLogs accLogs
Where accLogs.TransactionId = tr.Id and accLogs.AccountID= @AccountID
    UNION ALL
    SELECT 0 ,0)A ORDER BY [Date] DESC
END
----------------
Create PROCEDURE AddNewStaff @Username nvarchar(50), @Password nvarchar(MAX),  @FirstName nvarchar(50), @LastName nvarchar(50), @RoleId int, @DateCreated datetime
AS
	INSERT INTO Account values(@Username, @Password, 1, 0, @DateCreated)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, FirstName, LastName) VALUES(@AccountID, @FirstName, @LastName)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)

