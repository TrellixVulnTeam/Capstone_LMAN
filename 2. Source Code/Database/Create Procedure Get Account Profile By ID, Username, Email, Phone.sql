USE CapstonesNoRelation
GO

DROP PROC IF EXISTS UpdateProfileByAccountID
GO
CREATE PROC UpdateProfileByAccountID
(@accountID int, @firstName nvarchar(50), @lastName nvarchar(50), @gender bit, @dob date, @email nvarchar(50), @phone nvarchar(50), @address nvarchar(max) )
AS
BEGIN
   UPDATE [dbo].[Profile]
   SET [FirstName] = @firstName
      ,[LastName] = @lastName
      ,[Gender] = @gender
      ,[DOB] = @dob
      ,[Email] = @email
      ,[Phone] = @phone
      ,[Address] = @address
 WHERE AccountId = @accountID
END
GO

DROP PROC IF EXISTS GetProfileByUsername
GO
CREATE PROC GetProfileByUsername
@username VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE UserName = @username
END
GO

DROP PROC IF EXISTS GetProfileByEmail
GO
CREATE PROC GetProfileByEmail
@email VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE Email = @email
END
GO

DROP PROC IF EXISTS GetProfileByPhone
GO
CREATE PROC GetProfileByPhone
@phone VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE Phone = @phone
END
GO

DROP PROC IF EXISTS GetProfileByAccountID
GO
CREATE PROC GetProfileByAccountID
@id INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE Account.Id = @id
END

DROP PROC IF EXISTS GetProfileByName
GO
CREATE PROC GetProfileByName
@keyword NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] 
	FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE CONCAT(FirstName, ' ', LastName) LIKE '%'+@keyword+'%'
	ORDER BY Account.Id
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
