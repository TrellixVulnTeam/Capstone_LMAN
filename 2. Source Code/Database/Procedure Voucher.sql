USE CapstonesNoRelation
GO
DROP PROC IF EXISTS [dbo].[GiveVoucher]
GO
CREATE PROC [dbo].[GiveVoucher]
@VoucherID int, @UserID int, @IsUsed bit
AS
BEGIN
INSERT INTO [AccountVoucher]
Values (@UserID,@VoucherID,@IsUsed)
END;
