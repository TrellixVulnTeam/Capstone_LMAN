CREATE PROCEDURE getMessageByConversationId
@conversationId int
AS
BEGIN
SELECT Message.Id, Message.FromAccountId, Message.ToAccountId, Message.Content, Message.SenderDeleted, Message.ReceiverDeleted, Message.IsRead, Message.ConversationId,Message.Time, MessageImage.Url
  FROM dbo.Message
  LEFT OUTER JOIN dbo.MessageImage
  ON Message.Id = MessageImage.MessageId
  where Message.ConversationId = @conversationId
  order by Message.Time ASC
END