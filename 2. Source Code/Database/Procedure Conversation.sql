
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