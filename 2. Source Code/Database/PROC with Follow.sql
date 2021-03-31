CREATE PROC GetFollowerCount
@userId int
AS
BEGIN
SELECT COUNT(*) FROM AccountRelation
WHERE AccountId2 = @userId and RelationType = 1
END

GO
CREATE PROC GetListFollower
@userId int
AS
BEGIN
SELECT AccountId1 FROM AccountRelation
WHERE AccountId2 = @userId and RelationType = 1
END

GO
CREATE PROC FollowUser
(@followerId int, @userGetFollowId int)
AS
BEGIN
INSERT INTO [dbo].[AccountRelation]
           ([AccountId1]
           ,[AccountId2]
           ,[RelationType])
		   OUTPUT inserted.*
     VALUES
           (@followerId
           ,@userGetFollowId
           ,1)
END

GO
CREATE PROC UnfollowUser
(@followerId int, @userGetFollowId int)
AS
BEGIN
DELETE FROM [dbo].[AccountRelation]
WHERE AccountId1 = @followerId AND AccountId2 = @userGetFollowId AND RelationType = 1
END

CREATE PROC CheckFollowed
(@followerId int, @userGetFollowId int)
AS
BEGIN
SELECT * FROM AccountRelation 
WHERE AccountId1 = @followerId AND AccountId2 = @userGetFollowId AND RelationType = 1
END


EXEC CheckFollowed 11,4
EXEC UnfollowUser 13,4
EXEC FollowUser 11,4
EXEC GetListFollower 4
EXEC GetFollowerCount 4