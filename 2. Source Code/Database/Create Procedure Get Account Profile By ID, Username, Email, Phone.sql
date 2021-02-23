USE CapstonesNoRelation
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
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
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
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE Account.Id = @id
END