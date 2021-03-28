CREATE PROC SetDeleteFlagForMessage
(@messageId int, @isDeletedBySender bit)
AS
IF(@isDeletedBySender = 1)
BEGIN
	UPDATE Message 
	SET SenderDeleted = 1
	WHERE Id = @messageId
END
ELSE
BEGIN
	UPDATE Message 
	SET ReceiverDeleted = 1
	WHERE Id = @messageId
END
