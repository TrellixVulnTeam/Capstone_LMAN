
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

/****** Object:  StoredProcedure [dbo].[DeleteCoversation]    Script Date: 4/17/2021 1:05:11 PM ******/
DROP PROC IF EXISTS [dbo].[DeleteCoversation]
GO
CREATE PROC [dbo].[DeleteCoversation]
@AccountID int,
@ChatWithAccountId int
AS
BEGIN
UPDATE Message 
	SET SenderDeleted = case when (FromAccountId =@AccountID and ToAccountId = @ChatWithAccountId and SenderDeleted=0 )  then '1' else SenderDeleted end,
	ReceiverDeleted= case when (FromAccountId =@ChatWithAccountId and ToAccountId = @AccountID and ReceiverDeleted=0 )  then '1' else ReceiverDeleted end
 where (FromAccountId =@AccountID and ToAccountId =@ChatWithAccountId) or ( FromAccountId =@ChatWithAccountId and ToAccountId =@AccountID)
 End

 /****** Object:  StoredProcedure [dbo].[GetNumberUnreadMessage]    Script Date: 4/17/2021 1:08:22 PM ******/
DROP PROC IF EXISTS [dbo].[GetNumberUnreadMessage]
GO
CREATE PROC [dbo].[GetNumberUnreadMessage]
@userID INT
AS
BEGIN
	SELECT COUNT(DISTINCT(ConversationId)) 
	FROM Message
	WHERE ((FromAccountId = @userID AND SenderDeleted = 0)OR (ToAccountId = @userID AND ReceiverDeleted = 0)) AND IsRead = 0 
END
