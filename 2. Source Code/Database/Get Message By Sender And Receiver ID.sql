  Use CapstonesNoRelation
  GO

  CREATE PROC getMessageBySenderAndReceiverID
  @userId1 int,
  @userId2 int
  AS
  BEGIN
  SELECT Message.Id, Message.FromAccountId, Message.ToAccountId, Message.Content, Message.SenderDeleted, Message.ReceiverDeleted, Message.IsRead, Message.ConversationId,Message.Time, MessageImage.Url
  FROM dbo.Message
  LEFT OUTER JOIN dbo.MessageImage
  ON Message.Id = MessageImage.MessageId
  where (Message.FromAccountId = @userId1 and Message.ToAccountId = @userId2) or (Message.FromAccountId = @userId2 and Message.ToAccountId = @userId1)
  END

  EXEC getMessageBySenderAndReceiverID 3,4