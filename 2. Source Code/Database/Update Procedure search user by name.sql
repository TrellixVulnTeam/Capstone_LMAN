USE [Capstone_Version_2.0]
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByName]    Script Date: 5/1/2021 9:30:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[GetProfileByName]
@keyword NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] , IsFashionista
	FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE CONCAT(FirstName, ' ', LastName) LIKE '%'+@keyword+'%' AND IsActive = 1 AND IsBlock = 0
	ORDER BY Account.Id
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
