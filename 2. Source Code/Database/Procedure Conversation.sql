
USE CapstonesNoRelation
GO
DROP PROC IF EXISTS [dbo].[SearchConversation]
GO
CREATE PROC [dbo].[SearchConversation] 
@AccountID int,
@searchValue nvarchar(50)
AS
BEGIN
Select top(10) *
From(select * 
from Account a , [Profile] p
where a.Id =p.AccountId and a.IsActive=1 and a.IsBlock =0) as A
where (A.UserName like '%'+ISNULL(@searchValue,'')+'%' or (A.FirstName + A.LastName) like '%'+ISNULL(@searchValue,'')+'%') and A.AccountId <> @AccountID
END;

/****** Object:  StoredProcedure [dbo].[GetAllUserSearch]    Script Date: 4/17/2021 1:02:53 PM ******/
DROP PROC IF EXISTS [dbo].[GetAllUserSearch]
GO
CREATE PROC [dbo].[GetAllUserSearch]
@AccountID int
AS
BEGIN

Select  *
From(select * 
from Account a , [Profile] p
where a.Id =p.AccountId and a.IsActive=1 and a.IsBlock =0) as A
Where A.AccountId<>@AccountID
END;