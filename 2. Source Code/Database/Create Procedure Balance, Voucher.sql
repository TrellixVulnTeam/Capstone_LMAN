USE CapstonesNoRelation
GO
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[AddVoucher]
GO
CREATE PROCEDURE [dbo].[AddVoucher]
@Title nvarchar(max), @code nvarchar(50) ,@content nvarchar(max),@Description nvarchar(max), @Image nvarchar(50), @FromDate date, @ToDate date, @IsExpress bit , @Quantity int 
as
Begin
SET NOCOUNT OFF;
  DECLARE @trancount int;
  SET @trancount = @@trancount;
	begin try
	 IF @trancount = 0
      BEGIN TRANSACTION
      ELSE
        SAVE TRANSACTION saveMyPoint;
INSERT INTO Voucher ([Title], [Code], [Content],[Description], [Image], [FromDate], [ToDate], [IsExpires], [Quantity])
values(@Title,@code,@content,@Description,@Image,@FromDate,@ToDate , @IsExpress, @Quantity)
IF @trancount = 0
      COMMIT;

	end try
	BEGIN CATCH
	 DECLARE @error int,
            @message varchar(4000),
            @xstate int;

    SELECT
      @error = ERROR_NUMBER(),
      @message = ERROR_MESSAGE(),
      @xstate = XACT_STATE();

    IF @xstate = -1
      ROLLBACK;
    IF @xstate = 1 AND @trancount = 0
      ROLLBACK
    IF @xstate = 1 AND @trancount > 0
		 ROLLBACK TRANSACTION saveMyPoint ;
		     RAISERROR ('addVoucher: %d: %s', 16, 1, @error, @message);
	End Catch
END
GO
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[getBalanceByAccountID]
GO
CREATE PROCEDURE [dbo].[getBalanceByAccountID]
@AccountID int
AS
BEGIN
SELECT TOP 1 [Balance] FROM (Select  accLogs.AfterBalance Balance,tr.[Date]
From Transactions tr, AccountLogs accLogs
Where accLogs.TransactionId = tr.Id and accLogs.AccountID= @AccountID
    UNION ALL
    SELECT 0 ,0)A ORDER BY [Date] DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[getTransactionHistoryByAccountID]
GO
CREATE PROCEDURE [dbo].[getTransactionHistoryByAccountID]
@AccountID int
AS
BEGIN
SELECT trans.Id TransactionId, accLogs.BeforeBalance, accLogs.AfterBalance, trans.Amount, trans.[Type] TypeID, trans.[Date] TransactionTime, trans.AdminId, accLogs.AccountId
From AccountLogs accLogs, Transactions trans
Where accLogs.TransactionId =trans.Id and accLogs.AccountID=@AccountID
ORDER BY trans.[Date] DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[getVoucherByAccountID]
GO
create procedure [dbo].[getVoucherByAccountID]
@AccountId int, @IsExpires bit, @IsUsed bit
AS
Begin
select v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
from Voucher v , AccountVoucher av
where  v.Id= av.VoucherId and av.AccountId=@AccountId and v.IsExpires=@IsExpires and av.IsUsed=@IsUsed
End
GO
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[getVoucherDetailByAccountId]
GO
create procedure [dbo].[getVoucherDetailByAccountId]
@AccountId int, @Id int
AS
Begin
select v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
from Voucher v , AccountVoucher av
where  v.Id= av.VoucherId and av.AccountId=@AccountId and v.Id=@Id
End
GO
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 2/24/2021 4:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP PROCEDURE IF EXISTS [dbo].[topUpForAccount]
GO
CREATE PROCEDURE [dbo].[topUpForAccount]
@AccountID int, @Amount decimal(18,6), @AdminID int, @Description nvarchar(max)
As
BEGIN 
SET NOCOUNT OFF;
  DECLARE @trancount int;
  SET @trancount = @@trancount;
	begin try
	 IF @trancount = 0
      BEGIN TRANSACTION
      ELSE
        SAVE TRANSACTION saveMyPoint;
	DECLARE @checkSum varchar(10)=(SELECT Substring(( SELECT CONVERT(varchar(max),(select HASHBYTES('md5',CAST((select CURRENT_TIMESTAMP) AS binary))),2)),1,10));
	DECLARE @beforeBalance decimal(18,6)=(SELECT TOP 1 [Balance] FROM (Select  accLogs.AfterBalance Balance,tr.[Date]
From Transactions tr, AccountLogs accLogs
Where accLogs.TransactionId = tr.Id and accLogs.AccountID= @AccountID
    UNION ALL
    SELECT 0 ,0)A ORDER BY [Date] DESC)
		INSERT INTO Transactions ([Type], [Amount], [AdminId],[Date],[CheckSum] ,[Description])
		VALUES(1,@Amount,@AdminID,GETDATE(),@checkSum,@Description)
		insert into AccountLogs([AccountID],[BeforeBalance],[AfterBalance],[CheckSum],[TransactionId])
		values(@AccountID,@beforeBalance,@beforeBalance+@Amount,@checkSum,(Select TOP(1) ID from Transactions where [CheckSum]=@checkSum ))
		   lbexit:
      IF @trancount = 0
      COMMIT;

	end try
	BEGIN CATCH
	 DECLARE @error int,
            @message varchar(4000),
            @xstate int;

    SELECT
      @error = ERROR_NUMBER(),
      @message = ERROR_MESSAGE(),
      @xstate = XACT_STATE();

    IF @xstate = -1
      ROLLBACK;
    IF @xstate = 1 AND @trancount = 0
      ROLLBACK
    IF @xstate = 1 AND @trancount > 0
		 ROLLBACK TRANSACTION saveMyPoint ;
		     RAISERROR ('topUpAccount: %d: %s', 16, 1, @error, @message);
	End Catch
END