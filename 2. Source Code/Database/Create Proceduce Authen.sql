DROP PROC IF EXISTS AddNewAccount
GO
CREATE PROCEDURE AddNewAccount @Username nvarchar(50), @Password nvarchar(MAX), @Email nvarchar(MAX), @Phone nvarchar(50), @RoleId int
AS
	INSERT INTO Account values(@Username, @Password, 1, 0)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, Email, Phone) VALUES(@AccountID, @Email, @Phone)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)
GO

-- ------------
DROP PROCEDURE IF EXISTS GetUserByUserName
GO
CREATE PROCEDURE GetUserByUserName @Username nvarchar(50)
AS
	SELECT * FROM Account c WHERE c.UserName = @Username
GO

-------------
DROP PROCEDURE IF EXISTS GetUserWithRoleByUserName
GO
CREATE PROCEDURE GetUserWithRoleByUserName @Username nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.UserName = @Username
GO

------------
DROP PROCEDURE IF EXISTS GetUserWithRoleByEmail
GO
CREATE PROCEDURE GetUserWithRoleByEmail @Email nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Email = @Email
GO
------------
DROP PROCEDURE IF EXISTS GetUserWithRoleByPhone
GO
CREATE PROCEDURE GetUserWithRoleByPhone @Phone nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Phone = @Phone
GO
------------
DROP PROCEDURE IF EXISTS UpdateUserPassword
GO
CREATE PROCEDURE UpdateUserPassword @Username nvarchar(50), @Password nvarchar(MAX)
AS
	UPDATE Account
	SET Password = @Password
	WHERE UserName = @Username;
GO
